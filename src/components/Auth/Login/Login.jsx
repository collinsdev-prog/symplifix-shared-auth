import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/authActions";
import { Link } from "react-router-dom";
import { SharedContext } from "../../../context/SharedContextProvider/SharedContextProvider";
import "./Login.css";

const Login = () => {
  const { logo } = useContext(SharedContext);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Form submitted with values:", values);
    try {
      // Dispatch login action
      await dispatch(login(values)); // Call redux action
      message.success("Login successful!");
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login_container">
      <div className="login_overlay"></div>
      <div className="login_logo_container">
        <Link to="/">
          <img src={logo} alt="Company Logo" className="login_logo" />
        </Link>
      </div>

      <div className="login_card">
        <h1 className="login_title">Welcome Back</h1>
        <p className="login_subtitle">Log in to continue</p>
        <Form
          name="login_form"
          className="login_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <div className="form_footer">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/forgot-password" className="forgot_link">
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login_button"
              block
            >
              Log In
            </Button>
          </Form.Item>

          <div className="signup_redirect">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup_link">
              Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

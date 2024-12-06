import React, { useContext } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { signup } from "../../../actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import { SharedContext } from "../../../context/SharedContextProvider/SharedContextProvider";
import "./SignUp.css";

const { Option } = Select;

const Signup = () => {
  const { logo } = useContext(SharedContext);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { confirmPassword, ...userData } = values;
    try {
      const response = await dispatch(signup(userData));
      message.success("Signup successful! Please verify your email.");
      navigate(`/verify-email?token=${response.token}`);
    } catch (error) {
      message.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_overlay"></div>
      <div className="signup_logo_container">
        <Link to="/">
          <img src={logo} alt="Company Logo" className="signup_logo" />
        </Link>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="signup_form"
      >
        <h2 className="signup_header">Sign-Up </h2>

        <div className="form_row">
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
        <div className="form_row">
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
        </div>
        <div className="form_row">
          <Form.Item
            name="preferred_language"
            label="Preferred Language"
            rules={[
              { required: true, message: "Please select a preferred language" },
            ]}
          >
            <Select placeholder="Preferred Language">
              <Option value="english">English</Option>
              <Option value="french">French</Option>
              <Option value="spanish">Spanish</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="I am a..."
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select your role">
              <Option value="farmer">Farmer</Option>
              <Option value="warehouse_owner">Warehouse Owner</Option>
              <Option value="tractor_owner">Tractor Owner</Option>
              <Option value="derisking_company">Derisking Company</Option>
              <Option value="buyer">Buyer</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="form_row">
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="signup_button"
          >
            Sign-Up
          </Button>
        </Form.Item>
        <div className="signup_redirect">
          Already have an account?{" "}
          <Link to="/login" className="login_link">
            login Instead
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Signup;

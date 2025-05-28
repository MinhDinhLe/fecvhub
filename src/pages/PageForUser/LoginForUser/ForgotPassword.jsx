import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../../../api/authApi';
import logo from '../../../assets/logos/logo.png';
import '../../../styles/ForgotPassword.css';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState('email'); // email -> otp -> newPassword
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [otpValue, setOtpValue] = useState(''); // Controlled input for OTP
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(120); // 120 seconds = 2 minutes
  const timerRef = useRef(null);
  const [otpForm] = Form.useForm(); // Create form instance to control form

  // Debugging: Log renders to check frequency
  console.log('ForgotPassword component rendered', { currentStep, countdown });

  // Calculate isResendDisabled based on countdown (no state needed)
  const isResendDisabled = useMemo(() => {
    return currentStep === 'otp' && countdown > 0;
  }, [currentStep, countdown]);

  // Start timer when entering OTP step
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Effect to manage timer based on step
  useEffect(() => {
    if (currentStep === 'otp' && countdown > 0) {
      startTimer();
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentStep, startTimer]);

  // Handle email submission
  const handleEmailSubmit = useCallback(async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      setEmail(values.email);
      setCountdown(120); // Reset countdown
      setOtpValue(''); // Reset OTP input
      message.success('Mã xác thực đã được gửi đến email của bạn!');
      setCurrentStep('otp');
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi gửi mã xác thực');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle OTP submission
  const handleOTPSubmit = useCallback(async (values) => {
    setLoading(true);
    try {
      setVerificationCode(values.otp);
      message.success('Vui lòng nhập mật khẩu mới');
      setCurrentStep('newPassword');
    } catch (error) {
      message.error('Mã xác thực không đúng hoặc đã hết hạn');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle password submission
  const handlePasswordSubmit = useCallback(async (values) => {
    setLoading(true);
    try {
      await resetPassword(email, verificationCode, values.newPassword);
      message.success('Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      message.error(error.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  }, [email, verificationCode, navigate]);

  // Handle resend OTP
  const handleResendOTP = useCallback(async () => {
    setLoading(true);
    try {
      await forgotPassword(email);
      setCountdown(120);
      setOtpValue(''); // Reset OTP input
      otpForm.resetFields(); // Reset form fields
      message.success('Đã gửi lại mã xác thực!');
    } catch (error) {
      message.error('Không thể gửi lại mã xác thực. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  }, [email, otpForm]);

  // Handle OTP input change
  const handleOtpChange = useCallback((e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtpValue(value);
      // Update form field value as well
      otpForm.setFieldsValue({ otp: value });
    }
  }, [otpForm]);

  // Format countdown display
  const formatCountdown = useMemo(() => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [countdown]);

  // Email Form
  if (currentStep === 'email') {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-content">
          <div className="form-container">
            <Form onFinish={handleEmailSubmit}>
              <Title level={3}>Quên mật khẩu</Title>
              <Text>Nhập email của bạn để nhận mã xác thực</Text>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Gửi mã xác thực
              </Button>
              <Button type="link" onClick={() => navigate('/login')} block>
                Quay lại đăng nhập
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  // OTP Form
  if (currentStep === 'otp') {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-content">
          <div className="form-container">
            <Form form={otpForm} onFinish={handleOTPSubmit}>
              <Title level={3}>Nhập mã xác thực</Title>
              <Text>Mã xác thực đã được gửi đến email {email}</Text>
              <div
                style={{
                  textAlign: 'center',
                  margin: '10px 0',
                  color: countdown <= 30 ? '#ff4d4f' : '#1890ff',
                }}
              >
                Mã xác thực còn hiệu lực trong: {formatCountdown}
              </div>
              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: 'Vui lòng nhập mã xác thực!' },
                  { len: 6, message: 'Mã xác thực phải có 6 số!' },
                  { pattern: /^[0-9]{6}$/, message: 'Mã xác thực chỉ được chứa số!' },
                ]}
              >
                <Input
                  placeholder="Nhập mã xác thực"
                  maxLength={6}
                  value={otpValue}
                  onChange={handleOtpChange}
                  autoFocus
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Tiếp tục
              </Button>
              <Button
                type="link"
                block
                onClick={handleResendOTP}
                disabled={isResendDisabled}
                loading={loading}
                style={{
                  marginTop: '10px',
                  color: isResendDisabled ? '#d9d9d9' : '#1890ff',
                }}
              >
                {isResendDisabled ? `Gửi lại mã sau ${countdown}s` : 'Gửi lại mã xác thực'}
              </Button>
              <Button type="link" onClick={() => setCurrentStep('email')} block>
                Quay lại
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  // New Password Form
  if (currentStep === 'newPassword') {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-content">
          <div className="form-container">
            <Form onFinish={handlePasswordSubmit}>
              <Title level={3}>Đặt lại mật khẩu</Title>
              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Đặt lại mật khẩu
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ForgotPassword;
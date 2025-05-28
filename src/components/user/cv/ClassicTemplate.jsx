import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  message,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../../auth/AuthProvider';
import {
  updateCandidate,
  addWorkHistory,
  updateWorkHistory,
} from '../../../api/candidateApi';

// Định nghĩa PROFICIENCY_LEVELS đồng bộ với ProfileSection
const PROFICIENCY_LEVELS = {
  BEGINNER: { label: 'Cơ bản', color: '#ff7a45' },
  INTERMEDIATE: { label: 'Trung cấp', color: '#1890ff' },
  ADVANCED: { label: 'Cao cấp', color: '#52c41a' },
  EXPERT: { label: 'Thành thạo', color: '#722ed1' },
};

// Định nghĩa EDUCATION_LEVELS từ ProfileSection
const EDUCATION_LEVELS = {
  HIGH_SCHOOL: 'Trung học phổ thông',
  COLLEGE: 'Cao đẳng',
  UNIVERSITY: 'Đại học',
  POSTGRADUATE: 'Thạc sĩ',
  DOCTORATE: 'Tiến sĩ',
  OTHER: 'Khác',
};

const sanitizeHTML = (html) => {
  return { __html: html || 'Chưa có thông tin' };
};

// Các thành phần Icon (không thay đổi)
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v8c0 1.1-.9 2-2 2h-2.62L18 22H6l.62-8H4c-1.1 0-2-.9-2-2V4h5zm2-2v2h6V2H9zm5 18l-.5-6h-3L10 20h4z"/>
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.998 2.998 0 0 0 17.14 7H16.8c-.8 0-1.54.37-2.01.99l-.49.74c-.43.65-.26 1.52.39 1.95l2.93 1.95V18h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 1h-2c-.83 0-1.5.67-1.5 1.5v6h5v-6c0-.83-.67-1.5-1.5-1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9l-1.5-4.5A1.498 1.498 0 0 0 6.1 9.5H5.9c-.56 0-1.08.28-1.39.74L3 12.5V18h4.5z"/>
  </svg>
);

const ClassicTemplate = ({ candidateData, skills, workHistory, onUpdateProfile }) => {
  const { user, token } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [workHistoryForm] = Form.useForm();
  const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
  const [isWorkHistoryModalVisible, setIsWorkHistoryModalVisible] = useState(false);
  const [editingWorkHistory, setEditingWorkHistory] = useState(null);

  // Fallback values to prevent undefined errors
  const safeCandidateData = candidateData || {};
  const safeSkills = Array.isArray(skills) ? skills : [];
  const safeWorkHistory = Array.isArray(workHistory) ? workHistory : [];

  // Handle Education Update
  const handleUpdateEducation = async (values) => {
    try {
      const updatedData = {
        ...safeCandidateData,
        educationLevel: values.educationLevel,
        educationDescription: values.educationDescription,
        educationStartYear: values.educationPeriod ? values.educationPeriod[0].year() : null,
        educationEndYear: values.educationPeriod ? values.educationPeriod[1].year() : null,
      };

      // Call API to update candidate
      const updatedProfile = await updateCandidate(safeCandidateData.id, updatedData, token);
      onUpdateProfile(updatedProfile);
      message.success('Cập nhật học vấn thành công');
      setIsEducationModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Lỗi khi cập nhật học vấn:', error);
      message.error('Lỗi khi cập nhật học vấn: ' + error.message);
    }
  };

  // Handle Work History Submit
  const handleSubmitWorkHistory = async (values) => {
    try {
      const workHistoryData = {
        companyName: values.company,
        position: values.title,
        startDate: values.startDate.toDate(),
        endDate: values.isCurrentJob ? null : values.endDate?.toDate(),
        description: values.description,
        isCurrentJob: values.isCurrentJob || false,
      };

      let updatedWorkHistory;
      if (editingWorkHistory) {
        // Update existing work history
        await updateWorkHistory(safeCandidateData.id, editingWorkHistory.id, workHistoryData, token);
        updatedWorkHistory = safeWorkHistory.map((work) =>
          work.id === editingWorkHistory.id ? { ...work, ...workHistoryData } : work
        );
        message.success('Cập nhật kinh nghiệm làm việc thành công');
      } else {
        // Add new work history
        const newWorkHistory = await addWorkHistory(safeCandidateData.id, workHistoryData, token);
        updatedWorkHistory = [...safeWorkHistory, newWorkHistory];
        message.success('Thêm kinh nghiệm làm việc thành công');
      }

      onUpdateProfile({ ...safeCandidateData, workHistory: updatedWorkHistory });
      setIsWorkHistoryModalVisible(false);
      workHistoryForm.resetFields();
      setEditingWorkHistory(null);
    } catch (error) {
      console.error('Lỗi khi lưu kinh nghiệm làm việc:', error);
      message.error('Lỗi khi lưu kinh nghiệm làm việc: ' + error.message);
    }
  };

  // Handle Edit Work History
  const handleEditWorkHistory = (work) => {
    setEditingWorkHistory(work);
    workHistoryForm.setFieldsValue({
      title: work.position,
      company: work.companyName,
      startDate: work.startDate ? dayjs(work.startDate) : null,
      endDate: work.endDate ? dayjs(work.endDate) : null,
      isCurrentJob: work.isCurrentJob,
      description: work.description,
    });
    setIsWorkHistoryModalVisible(true);
  };

  return (
    <div style={{
      width: '794px',
      height: '1123px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex'
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: '#5a7a6b',
        color: 'white',
        padding: '30px 25px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Profile Image */}
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: '#4a6a5b',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid rgba(255,255,255,0.2)',
          overflow: 'hidden'
        }}>
          {safeCandidateData.avatar ? (
            <img
              src={safeCandidateData.avatar}
              alt="avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <UserIcon />
          )}
        </div>

        {/* Name and Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{
            color: 'white',
            margin: '0 0 8px',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '1.2'
          }}>
            {safeCandidateData.fullName || 'Họ và tên'}
          </h2>
          <div style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '16px'
          }}>
            {safeCandidateData.title || 'Chức danh'}
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '25px' }}>
          {safeCandidateData.phone && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              fontSize: '13px'
            }}>
              <div style={{ marginRight: '10px', width: '16px' }}>
                <PhoneIcon />
              </div>
              <span>{safeCandidateData.phone}</span>
            </div>
          )}
          {safeCandidateData.email && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              fontSize: '13px'
            }}>
              <div style={{ marginRight: '10px', width: '16px' }}>
                <MailIcon />
              </div>
              <span>{safeCandidateData.email}</span>
            </div>
          )}
          {safeCandidateData.address && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              fontSize: '13px'
            }}>
              <div style={{ marginRight: '10px', width: '16px' }}>
                <HomeIcon />
              </div>
              <span>{safeCandidateData.address}</span>
            </div>
          )}
          {safeCandidateData.birthday && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              fontSize: '13px'
            }}>
              <div style={{ marginRight: '10px', width: '16px' }}>
                <CalendarIcon />
              </div>
              <span>{dayjs(safeCandidateData.birthday).format('DD/MM/YYYY')}</span>
            </div>
          )}
        </div>

        {/* Career Objective */}
        {safeCandidateData.description && (
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{
              color: 'white',
              margin: '0 0 15px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Mục tiêu nghề nghiệp
            </h4>
            <div
              dangerouslySetInnerHTML={sanitizeHTML(safeCandidateData.description)}
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '12px',
                lineHeight: '1.5'
              }}
            />
          </div>
        )}

        {/* Skills */}
        {safeSkills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{
              color: 'white',
              margin: '0 0 15px',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{ marginRight: '8px' }}>
                <TrophyIcon />
              </div>
              Kỹ năng
            </h4>
            {safeSkills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: PROFICIENCY_LEVELS[skill.proficiencyLevel]?.color || '#8c8c8c',
                    marginRight: '8px'
                  }}
                />
                {skill.skillName} ({PROFICIENCY_LEVELS[skill.proficiencyLevel]?.label || 'Không xác định'})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{
        flex: 1,
        padding: '40px 35px',
        backgroundColor: 'white',
        overflow: 'auto'
      }}>
        {/* Education */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 20px',
              color: '#5a7a6b',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#5a7a6b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                color: 'white'
              }}>
                <BookIcon />
              </div>
              Học vấn
            </h3>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setIsEducationModalVisible(true)}
              style={{ color: '#5a7a6b' }}
            />
          </div>
          <div style={{ marginLeft: '55px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                {EDUCATION_LEVELS[safeCandidateData.educationLevel] || 'Trình độ học vấn'}
              </h4>
              <span style={{
                color: '#5a7a6b',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {safeCandidateData.educationStartYear && safeCandidateData.educationEndYear
                  ? `${safeCandidateData.educationStartYear} - ${safeCandidateData.educationEndYear}`
                  : 'Chưa cập nhật'}
              </span>
            </div>
            <div
              dangerouslySetInnerHTML={sanitizeHTML(safeCandidateData.educationDescription)}
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666'
              }}
            />
          </div>
        </div>

        {/* Work Experience */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 20px',
              color: '#5a7a6b',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#5a7a6b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                color: 'white'
              }}>
                <TeamIcon />
              </div>
              Kinh nghiệm làm việc
            </h3>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingWorkHistory(null);
                workHistoryForm.resetFields();
                setIsWorkHistoryModalVisible(true);
              }}
              style={{ color: '#5a7a6b' }}
            />
          </div>
          {safeWorkHistory.length > 0 ? safeWorkHistory.map((work) => (
            <div key={work.id} style={{ marginLeft: '55px', marginBottom: '25px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <h4 style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {work.position || 'Chưa cập nhật'}
                </h4>
                <div>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEditWorkHistory(work)}
                    style={{ color: '#5a7a6b' }}
                  />
                </div>
              </div>
              <div style={{
                fontSize: '14px',
                marginBottom: '8px',
                color: '#333',
                fontWeight: 'bold'
              }}>
                {work.companyName || 'Chưa cập nhật'}
              </div>
              <div style={{
                color: '#5a7a6b',
                fontWeight: 'bold',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                {work.startDate
                  ? `${dayjs(work.startDate).format('YYYY')} - ${work.isCurrentJob ? 'Hiện tại' : work.endDate ? dayjs(work.endDate).format('YYYY') : 'Hiện tại'}`
                  : 'Chưa cập nhật'}
              </div>
              <div
                dangerouslySetInnerHTML={sanitizeHTML(work.description)}
                style={{
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: '#666'
                }}
              />
            </div>
          )) : (
            <div style={{ marginLeft: '55px', color: '#999', fontStyle: 'italic' }}>
              Chưa có thông tin kinh nghiệm làm việc
            </div>
          )}
        </div>
      </div>

      {/* Education Modal */}
      <Modal
        title="Chỉnh sửa Học vấn"
        open={isEducationModalVisible}
        onCancel={() => {
          setIsEducationModalVisible(false);
          form.resetFields();
        }}
        width={800}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsEducationModalVisible(false);
              form.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            educationLevel: safeCandidateData.educationLevel,
            educationDescription: safeCandidateData.educationDescription,
            educationPeriod: safeCandidateData.educationStartYear && safeCandidateData.educationEndYear
              ? [dayjs(`${safeCandidateData.educationStartYear}-01-01`), dayjs(`${safeCandidateData.educationEndYear}-01-01`)]
              : null,
          }}
          onFinish={handleUpdateEducation}
        >
          <Form.Item
            label="Trình độ học vấn"
            name="educationLevel"
            rules={[{ required: true, message: 'Vui lòng chọn trình độ học vấn' }]}
          >
            <Select>
              {Object.entries(EDUCATION_LEVELS).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Thời gian"
            name="educationPeriod"
            rules={[{ required: true, message: 'Vui lòng chọn khoảng thời gian' }]}
          >
            <DatePicker.RangePicker
              picker="year"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="educationDescription"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <ReactQuill
              theme="snow"
              style={{ height: '200px', marginBottom: '50px' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Work History Modal */}
      <Modal
        title={editingWorkHistory ? 'Sửa Kinh nghiệm làm việc' : 'Thêm Kinh nghiệm làm việc'}
        open={isWorkHistoryModalVisible}
        onCancel={() => {
          setIsWorkHistoryModalVisible(false);
          setEditingWorkHistory(null);
          workHistoryForm.resetFields();
        }}
        width={800}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsWorkHistoryModalVisible(false);
              setEditingWorkHistory(null);
              workHistoryForm.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => workHistoryForm.submit()}
          >
            {editingWorkHistory ? 'Cập nhật' : 'Thêm'}
          </Button>,
        ]}
      >
        <Form
          form={workHistoryForm}
          layout="vertical"
          onFinish={handleSubmitWorkHistory}
        >
          <Form.Item
            label={<>Chức danh <span style={{ color: '#ff4d4f' }}>*</span></>}
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập chức danh' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<>Công ty <span style={{ color: '#ff4d4f' }}>*</span></>}
            name="company"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
          >
            <Input />
          </Form.Item>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <Form.Item
              label="Từ tháng"
              name="startDate"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
              style={{ flex: 1 }}
            >
              <DatePicker
                format="MM/YYYY"
                picker="month"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Đến tháng"
              name="endDate"
              style={{ flex: 1 }}
              dependencies={['isCurrentJob']}
              rules={[
                ({ getFieldValue }) => ({
                  required: !getFieldValue('isCurrentJob'),
                  message: 'Vui lòng chọn ngày kết thúc',
                }),
              ]}
            >
              <DatePicker
                format="MM/YYYY"
                picker="month"
                style={{ width: '100%' }}
                disabled={workHistoryForm.getFieldValue('isCurrentJob')}
              />
            </Form.Item>
          </div>
          <Form.Item name="isCurrentJob" valuePropName="checked">
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  workHistoryForm.setFieldsValue({ endDate: null });
                }
              }}
            >
              Công việc hiện tại
            </Checkbox>
          </Form.Item>
          <Form.Item
            label={<>Mô tả <span style={{ color: '#ff4d4f' }}>*</span></>}
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <ReactQuill
              theme="snow"
              style={{ height: '200px', marginBottom: '50px' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassicTemplate;
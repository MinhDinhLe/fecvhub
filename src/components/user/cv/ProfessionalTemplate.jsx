import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import { CalendarOutlined, PhoneOutlined, MailOutlined, FacebookOutlined, EnvironmentOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';

const { Title, Text } = Typography;

const sanitizeHTML = (html) => {
  return { __html: DOMPurify.sanitize(html || '') };
};

const ProfessionalTemplate = ({ candidateData, workHistory, skills }) => {
  // Define proficiency levels with colors
  const PROFICIENCY_LEVELS = {
    BEGINNER: { label: 'Cơ bản', color: '#ff9f43' }, // Warm orange
    INTERMEDIATE: { label: 'Trung bình', color: '#f4a261' }, // Matching the header color
    ADVANCED: { label: 'Nâng cao', color: '#e76f51' }, // Warm coral
    EXPERT: { label: 'Chuyên gia', color: '#d00000' }, // Deep red
  };

  // Safe skills array to handle undefined skills
  const safeSkills = skills || [];

  return (
    <div style={{ 
      backgroundColor: '#f5e8c7', 
      width: '794px',
      height: '1123px',
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Row gutter={40}>
        {/* Left Column - Personal Info and Avatar */}
        <Col span={8} style={{ 
          textAlign: 'center',
          backgroundColor: 'rgba(245, 232, 199, 0.8)',
          padding: '20px',
          borderRadius: '10px'
        }}>
          {/* Avatar */}
          <div style={{ 
            width: '120px',
            height: '120px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #f4a261'
          }}>
            <img 
              src={candidateData?.avatar || 'https://via.placeholder.com/120'} 
              alt="avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Name and Title */}
          {candidateData?.fullName && (
            <Title level={2} style={{ 
              color: '#f4a261', 
              margin: '0 0 5px 0', 
              fontSize: '24px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {candidateData.fullName}
            </Title>
          )}
          {candidateData?.title && (
            <Text style={{ 
              color: '#264653',
              fontSize: '14px',
              textTransform: 'uppercase'
            }}>
              {candidateData.title}
            </Text>
          )}

          <Divider style={{ borderColor: '#f4a261', margin: '20px 0' }} />

          {/* Personal Info */}
          <div>
            <Title level={4} style={{ 
              color: '#f4a261', 
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '15px'
            }}>
              Thông tin cá nhân
            </Title>
            {candidateData?.dob && (
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarOutlined style={{ color: '#f4a261', marginRight: '8px' }} />
                <Text style={{ color: '#264653', fontSize: '12px' }}>{new Date(candidateData.dob).toLocaleDateString('vi-VN')}</Text>
              </div>
            )}
            {candidateData?.phone && (
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhoneOutlined style={{ color: '#f4a261', marginRight: '8px' }} />
                <Text style={{ color: '#264653', fontSize: '12px' }}>{candidateData.phone}</Text>
              </div>
            )}
            {candidateData?.email && (
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
impl                <MailOutlined style={{ color: '#f4a261', marginRight: '8px' }} />
                <Text style={{ color: '#264653', fontSize: '12px' }}>{candidateData.email}</Text>
              </div>
            )}
            {candidateData?.facebook && (
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FacebookOutlined style={{ color: '#f4a261', marginRight: '8px' }} />
                <Text style={{ color: '#264653', fontSize: '12px' }}>{candidateData.facebook}</Text>
              </div>
            )}
            {candidateData?.address && (
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EnvironmentOutlined style={{ color: '#f4a261', marginRight: '8px' }} />
                <Text style={{ color: '#264653', fontSize: '12px' }}>{candidateData.address}</Text>
              </div>
            )}
          </div>

          {/* Skills */}
          <div style={{ marginTop: '20px' }}>
            <Title level={4} style={{ 
              color: '#f4a261', 
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '15px'
            }}>
              Kỹ năng
            </Title>
            {safeSkills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  fontSize: '12px',
                  color: '#5c4033', // Deep brown for better contrast
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fce4d6', // Soft peach background
                  padding: '5px',
                  borderRadius: '5px'
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
        </Col>

        {/* Right Column - Sections */}
        <Col span={16} style={{ paddingLeft: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          {/* Career Objective */}
          {candidateData?.description && (
            <div style={{ marginBottom: '30px' }}>
              <Title level={4} style={{ 
                color: '#f4a261', 
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '15px'
              }}>
                Mục tiêu nghề nghiệp
              </Title>
              <div 
                className="ql-editor"
                dangerouslySetInnerHTML={sanitizeHTML(candidateData.description)}
                style={{ fontSize: '13px', lineHeight: '1.6', color: '#264653' }}
              />
            </div>
          )}

          {/* Education */}
          {candidateData?.educationDescription && (
            <div style={{ marginBottom: '30px' }}>
              <Title level={4} style={{ 
                color: '#f4a261', 
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '15px'
              }}>
                Học vấn
              </Title>
              <div 
                className="ql-editor"
                dangerouslySetInnerHTML={sanitizeHTML(candidateData.educationDescription)}
                style={{ fontSize: '13px', lineHeight: '1.6', color: '#264653' }}
              />
            </div>
          )}

          {/* Work Experience */}
          {workHistory && workHistory.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <Title level={4} style={{ 
                color: '#f4a261', 
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '15px'
              }}>
                Kinh nghiệm làm việc
              </Title>
              {workHistory.slice(0, 4).map((work, index) => (
                <div key={work.id} style={{ 
                  marginBottom: '20px'
                }}>
                  <Text strong style={{ fontSize: '14px', color: '#264653', display: 'block', marginBottom: '5px' }}>
                    {work.position} - {work.companyName}
                  </Text>
                  <Text style={{ fontSize: '12px', color: '#264653', display: 'block', marginBottom: '5px' }}>
                    {new Date(work.startDate).toLocaleDateString('vi-VN')} - 
                    {work.endDate ? new Date(work.endDate).toLocaleDateString('vi-VN') : 'Hiện tại'}
                  </Text>
                  {work.description && (
                    <div 
                      className="ql-editor"
                      dangerouslySetInnerHTML={sanitizeHTML(work.description)}
                      style={{ fontSize: '13px', lineHeight: '1.6', color: '#264653' }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfessionalTemplate;
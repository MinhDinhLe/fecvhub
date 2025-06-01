import React from 'react';
import { Typography, Row, Col, Progress, Divider, Tag } from 'antd';
import { PhoneOutlined, MailOutlined, HomeOutlined, TrophyOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';

const { Title, Text } = Typography;

const PROFICIENCY_LEVELS = {
  BEGINNER: { label: 'Cơ bản', color: '#00bcd4', percent: 33 },
  INTERMEDIATE: { label: 'Trung bình', color: '#00bcd4', percent: 66 },
  ADVANCED: { label: 'Nâng cao', color: '#00bcd4', percent: 100 },
  EXPERT: { label: 'Chuyên gia', color: '#00bcd4', percent: 100 }
};

const sanitizeHTML = (html) => {
  return { __html: DOMPurify.sanitize(html || '') };
};

const CreativeTemplate = ({ candidateData, skills, workHistory }) => {

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      width: '794px',
      height: '1123px',
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Row style={{ height: '100%' }}>
        {/* Left Column - Personal Info */}
        <Col span={10} style={{ 
          backgroundColor: 'white',
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Cyan accent line */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '6px',
            height: '100%',
            backgroundColor: '#00bcd4'
          }} />

          {/* Avatar and Name Section */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ 
              width: '120px',
              height: '120px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #00bcd4',
              boxShadow: '0 4px 12px rgba(0,188,212,0.2)'
            }}>
              <img 
                src={candidateData?.avatar || 'https://via.placeholder.com/120'} 
                alt="avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {candidateData?.fullName && (
              <Title level={2} style={{ 
                color: '#00bcd4', 
                margin: '0 0 8px 0', 
                fontSize: '24px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {candidateData.fullName}
              </Title>
            )}
            {candidateData?.title && (
              <Text style={{ 
                color: '#666',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {candidateData.title}
              </Text>
            )}
          </div>

          {/* Contact Info Section */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: '#00bcd4',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              marginBottom: '20px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              <PhoneOutlined style={{ marginRight: '8px' }} />
              THÔNG TIN LIÊN HỆ
            </div>
            
            {candidateData?.phone && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#00bcd4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <PhoneOutlined style={{ color: 'white', fontSize: '14px' }} />
                </div>
                <div>
                  <Text style={{ color: '#666', fontSize: '11px', display: 'block' }}>Số điện thoại</Text>
                  <Text style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{candidateData.phone}</Text>
                </div>
              </div>
            )}

            {candidateData?.email && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#00bcd4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <MailOutlined style={{ color: 'white', fontSize: '14px' }} />
                </div>
                <div>
                  <Text style={{ color: '#666', fontSize: '11px', display: 'block' }}>Email</Text>
                  <Text style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{candidateData.email}</Text>
                </div>
              </div>
            )}

            {candidateData?.address && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#00bcd4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <HomeOutlined style={{ color: 'white', fontSize: '14px' }} />
                </div>
                <div>
                  <Text style={{ color: '#666', fontSize: '11px', display: 'block' }}>Địa chỉ</Text>
                  <Text style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{candidateData.address}</Text>
                </div>
              </div>
            )}
          </div>

          {/* Education Section */}
          {(candidateData?.educationLevel || candidateData?.educationDescription) && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: '#00bcd4',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                marginBottom: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                <BookOutlined style={{ marginRight: '8px' }} />
                HỌC VẤN
              </div>
              
              {candidateData?.educationLevel && (
                <Title level={4} style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>
                  {candidateData.educationLevel}
                </Title>
              )}
              {candidateData?.educationDescription && (
                <div 
                  className="ql-editor"
                  dangerouslySetInnerHTML={sanitizeHTML(candidateData.educationDescription)}
                  style={{ fontSize: '13px', lineHeight: '1.5', color: '#666' }}
                />
              )}
            </div>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: '#00bcd4',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                marginBottom: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                <TrophyOutlined style={{ marginRight: '8px' }} />
                CÁC KỸ NĂNG
              </div>
              
              {skills.slice(0, 8).map(skill => (
                <div key={skill.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <Text style={{ color: '#333', fontSize: '13px', fontWeight: '500' }}>{skill.skillName}</Text>
                  </div>
                  <Progress 
                    percent={PROFICIENCY_LEVELS[skill.proficiencyLevel]?.percent}
                    strokeColor="#00bcd4"
                    showInfo={false}
                    strokeWidth={6}
                    trailColor="#e8e8e8"
                  />
                </div>
              ))}
            </div>
          )}
        </Col>

        {/* Right Column */}
        <Col span={14} style={{ 
          backgroundColor: '#f8f9fa',
          height: '100%',
          padding: '40px 35px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* About Section */}
          {candidateData?.description && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: '#00bcd4',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                marginBottom: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                <UserOutlined style={{ marginRight: '8px' }} />
                GIỚI THIỆU
              </div>
              
              <div 
                className="ql-editor"
                dangerouslySetInnerHTML={sanitizeHTML(candidateData.description)}
                style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}
              />
            </div>
          )}

          {/* Work Experience Section */}
          {workHistory && workHistory.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: '#00bcd4',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '20px',
                marginBottom: '25px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                <TrophyOutlined style={{ marginRight: '8px' }} />
                KINH NGHIỆM LÀM VIỆC
              </div>
              
              {workHistory.slice(0, 4).map((work, index) => (
                <div key={work.id} style={{ 
                  marginBottom: '25px',
                  paddingLeft: '20px',
                  borderLeft: index === 0 ? '3px solid #00bcd4' : '3px solid #e8e8e8',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-8px',
                    top: '5px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: index === 0 ? '#00bcd4' : '#e8e8e8'
                  }} />
                  
                  <Title level={4} style={{ color: '#00bcd4', margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {work.position}
                  </Title>
                  <Text strong style={{ fontSize: '14px', display: 'block', margin: '0 0 5px 0', color: '#333' }}>
                    {work.companyName}
                  </Text>
                  <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '10px' }}>
                    {new Date(work.startDate).toLocaleDateString('vi-VN')} - 
                    {work.endDate ? new Date(work.endDate).toLocaleDateString('vi-VN') : 'Hiện tại'}
                  </Text>
                  {work.description && (
                    <div 
                      className="ql-editor"
                      dangerouslySetInnerHTML={sanitizeHTML(work.description)}
                      style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}
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

export default CreativeTemplate;
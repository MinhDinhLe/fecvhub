import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';

const { Title, Text } = Typography;

const sanitizeHTML = (html) => {
  return { __html: DOMPurify.sanitize(html || '') };
};

const MinimalistTemplate= ({ candidateData, workHistory }) => {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      width: '794px',
      height: '1123px',
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      padding: '40px'
    }}>
      {/* Header Section */}
      <div style={{ textAlign: 'left', marginBottom: '30px' }}>
        {candidateData?.fullName && (
          <Title level={2} style={{ 
            color: '#000', 
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
            color: '#666',
            fontSize: '14px',
            textTransform: 'uppercase'
          }}>
            {candidateData.title}
          </Text>
        )}

        {/* Contact Info */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: '40px', right: '40px', gap: '20px' }}>
          {candidateData?.phone && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PhoneOutlined style={{ marginRight: '8px', color: '#666' }} />
              <Text style={{ color: '#333', fontSize: '12px' }}>{candidateData.phone}</Text>
            </div>
          )}
          {candidateData?.email && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MailOutlined style={{ marginRight: '8px', color: '#666' }} />
              <Text style={{ color: '#333', fontSize: '12px' }}>{candidateData.email}</Text>
            </div>
          )}
          {candidateData?.address && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HomeOutlined style={{ marginRight: '8px', color: '#666' }} />
              <Text style={{ color: '#333', fontSize: '12px' }}>{candidateData.address}</Text>
            </div>
          )}
        </div>
      </div>

      <Divider style={{ borderColor: '#000', margin: '20px 0' }} />

      {/* Career Objective Section */}
      {candidateData?.description && (
        <div style={{ marginBottom: '30px' }}>
          <Title level={4} style={{ 
            color: '#000', 
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '15px'
          }}>
            MỤC TIÊU NGHỀ NGHIỆP
          </Title>
          <div 
            className="ql-editor"
            dangerouslySetInnerHTML={sanitizeHTML(candidateData.description)}
            style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}
          />
        </div>
      )}

      <Divider style={{ borderColor: '#000', margin: '20px 0' }} />

      {/* Work Experience Section */}
      {workHistory && workHistory.length > 0 && (
        <div>
          <Title level={4} style={{ 
            color: '#000', 
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            KINH NGHIỆM LÀM VIỆC
          </Title>

          <Row>
            <Col span={24}>
              {workHistory.slice(0, 4).map((work, index) => (
                <div key={work.id} style={{ 
                  marginBottom: '25px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  {/* Timeline Line and Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '5px',
                    bottom: index === workHistory.length - 1 ? 'auto' : '0',
                    width: '2px',
                    background: 'linear-gradient(to bottom, #000 50%, #000 50%)',
                    backgroundSize: '2px 8px',
                    backgroundRepeat: 'repeat-y'
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '5px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#000'
                  }} />

                  {/* Work Details */}
                  <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>
                    {new Date(work.startDate).toLocaleDateString('vi-VN')} - 
                    {work.endDate ? new Date(work.endDate).toLocaleDateString('vi-VN') : 'Hiện tại'}
                  </Text>
                  <Text strong style={{ fontSize: '14px', display: 'block', marginBottom: '5px', color: '#333' }}>
                    {work.position} - {work.companyName}
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
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
import React from 'react';
import { Typography, Row, Col, Tag, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';

const { Title, Text } = Typography;

const PROFICIENCY_LEVELS = {
  BEGINNER: { label: 'Cơ bản', color: '#52c41a' },
  INTERMEDIATE: { label: 'Trung bình', color: '#73d13d' },
  ADVANCED: { label: 'Nâng cao', color: '#389e0d' },
  EXPERT: { label: 'Chuyên gia', color: '#237804' }
};

const sanitizeHTML = (html) => {
  return { __html: DOMPurify.sanitize(html || '') };
};

const ModernTemplate = ({ candidateData, skills, workHistory }) => {
  return (
    <div style={{ 
      backgroundColor: '#fff',
      width: '794px',
      height: '1123px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Arial', sans-serif",
      display: 'flex'
    }}>
      {/* Left Column - Green */}
      <div style={{
        width: '280px',
        backgroundColor: '#7cb342',
        color: 'white',
        padding: '40px 25px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Avatar */}
        <div style={{ 
          width: '200px',
          height: '200px',
          borderRadius: '10px',
          overflow: 'hidden',
          margin: '0 auto 30px',
          border: '4px solid white'
        }}>
          <img 
            src={candidateData?.avatar || 'https://via.placeholder.com/200'} 
            alt="avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            borderBottom: '2px solid white',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Text style={{ 
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              Ngày sinh
            </Text>
          </div>
          <Text style={{ 
            color: 'white',
            fontSize: '13px',
            display: 'block',
            marginBottom: '15px'
          }}>
            {candidateData?.birthDate ? new Date(candidateData.birthDate).toLocaleDateString('vi-VN') : '25/07/1996'}
          </Text>

          <div style={{ 
            borderBottom: '2px solid white',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Text style={{ 
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              Số điện thoại
            </Text>
          </div>
          <Text style={{ 
            color: 'white',
            fontSize: '13px',
            display: 'block',
            marginBottom: '15px'
          }}>
            {candidateData?.phone || '098 000 9987'}
          </Text>

          <div style={{ 
            borderBottom: '2px solid white',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Text style={{ 
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              Email
            </Text>
          </div>
          <Text style={{ 
            color: 'white',
            fontSize: '13px',
            display: 'block',
            marginBottom: '15px',
            wordBreak: 'break-all'
          }}>
            {candidateData?.email || 'Example@gmail.com'}
          </Text>

          <div style={{ 
            borderBottom: '2px solid white',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Text style={{ 
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              Địa chỉ
            </Text>
          </div>
          <Text style={{ 
            color: 'white',
            fontSize: '13px',
            display: 'block',
            marginBottom: '25px'
          }}>
            {candidateData?.address || 'Quận A, Hà Nội'}
          </Text>
        </div>

        {/* Professional Summary */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            borderBottom: '2px solid white',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Text style={{ 
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              MỤC TIÊU SỰ NGHIỆP
            </Text>
          </div>
          <div 
            className="ql-editor"
            dangerouslySetInnerHTML={sanitizeHTML(candidateData?.description || 'Hơn 3 năm kinh nghiệm làm công việc kế toán tại các công ty. Thành thạo trong việc xử lý chứng từ, thu chi, sử dụng các phần mềm Excel, Misa và làm việc với cơ quan thuế. Mong muốn được làm việc tại vị trí Nhân viên kế toán của công ty để đóng góp hoàn thiện các công việc kế toán của công ty theo đúng quy định pháp luật.')}
            style={{ 
              fontSize: '12px',
              lineHeight: '1.5',
              color: 'white',
              maxHeight: '120px',
              overflow: 'hidden'
            }}
          />
        </div>
      </div>

      {/* Right Column - White */}
      <div style={{
        flex: 1,
        padding: '40px 35px',
        backgroundColor: 'white'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <Title style={{ 
            fontSize: '36px',
            margin: '0 0 5px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            {candidateData?.fullName || 'Nguyễn Thu Thảo'}
          </Title>
          <div style={{
            backgroundColor: '#7cb342',
            color: 'white',
            padding: '8px 15px',
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            {candidateData?.title || 'NHÂN VIÊN KẾ TOÁN'}
          </div>
        </div>

        {/* Work Experience */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{
            borderBottom: '3px solid #7cb342',
            paddingBottom: '8px',
            marginBottom: '25px'
          }}>
            <Title level={3} style={{ 
              color: '#7cb342',
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              KINH NGHIỆM LÀM VIỆC
            </Title>
          </div>

          {(workHistory.length > 0 ? workHistory : [
            {
              id: 1,
              companyName: 'Công ty ABC',
              position: 'KẾ TOÁN TỔNG HỢP',
              startDate: '2022-09-01',
              endDate: null,
              description: `<ul>
                <li>Tiếp nhận, kiểm tra tính chính xác, hợp lý, hợp lệ của các chứng từ kế toán và sắp xếp, lưu trữ theo quy định công ty.</li>
                <li>Hạch toán, tổng hợp thu - chi phát sinh lên phần mềm kế toán.</li>
                <li>Tính các khoản thu - chi của công ty</li>
                <li>Theo dõi công nợ của khách hàng, nhà cung cấp.</li>
                <li>Kiểm soát các báo cáo công nợ mua hàng và bán hàng; sao kê ngân hàng để làm cân cứ hạch toán và xuất hóa đơn</li>
                <li>Thực hiện kiểm tra các hạch toán kế toán thu chi ngân hàng, tiền mặt</li>
                <li>Kiểm tra các bút toán của các vị trí kế toán: dụng, dự</li>
                <li>Theo dõi, kiểm kê lương hàng hóa thực tế và đối chiếu với số sách.</li>
                <li>Phối hợp với bộ phận kho để kiểm kê hàng hóa định kỳ và đột xuất, kiểm kê tài sản, hàng hóa toàn công ty cuối năm</li>
              </ul>`
            },
            {
              id: 2,
              companyName: 'Công ty ABC',
              position: 'KẾ TOÁN NỘI BỘ',
              startDate: '2020-08-01',
              endDate: '2022-08-31',
              description: `<ul>
                <li>Quản lý, lưu trữ toàn bộ hóa đơn, chứng từ kế toán, kê khai vào phần mềm kế toán.</li>
                <li>Thực hiện các giao dịch ngân hàng</li>
                <li>Báo cáo tài chính từ đó nắm bắt biến động về chi phí kịp thời đưa ra những giải pháp để kiểm soát chi phí.</li>
                <li>Kiểm soát và quản lý quy trình lập hồ sơ số sách, hạch toán các bút toán thanh toán, các quy trình kiểm kê tài sản, bảng cân đối kế toán cũng như các tài liệu khác có liên quan của doanh nghiệp Quản lý.</li>
                <li>Cập nhật chứng từ, theo dõi kịp thời, chính xác và đầy đủ số liệu kế toán của Công ty</li>
                <li>Lập báo cáo tài chính định kỳ</li>
              </ul>`
            }
          ]).slice(0, 2).map((work, index) => (
            <div key={work.id} style={{ marginBottom: '25px' }}>
              <Text strong style={{ 
                display: 'block',
                color: '#7cb342',
                fontSize: '14px',
                marginBottom: '2px'
              }}>
                {work.companyName}
              </Text>
              <Text style={{ 
                fontSize: '12px',
                color: '#666',
                float: 'right',
                marginTop: '-18px'
              }}>
                {new Date(work.startDate).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' })} - {work.endDate ? new Date(work.endDate).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' }) : 'Đến nay'}
              </Text>
              <Title level={4} style={{ 
                margin: '5px 0 10px',
                color: '#333',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {work.position}
              </Title>
              <div 
                className="ql-editor"
                dangerouslySetInnerHTML={sanitizeHTML(work.description)}
                style={{ 
                  fontSize: '12px', 
                  lineHeight: '1.4',
                  color: '#333'
                }}
              />
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{
            borderBottom: '3px solid #7cb342',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Title level={3} style={{ 
              color: '#7cb342',
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              HỌC VẤN
            </Title>
          </div>
          
          <Text strong style={{ 
            display: 'block',
            color: '#333',
            fontSize: '14px',
            marginBottom: '5px'
          }}>
            Học Viện Ngân Hàng
          </Text>
          <Text style={{ 
            fontSize: '12px',
            color: '#666',
            float: 'right',
            marginTop: '-18px'
          }}>
            2016 - 2020
          </Text>
          <Title level={4} style={{ 
            margin: '5px 0 10px',
            color: '#333',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            CHUYÊN NGÀNH KẾ TOÁN
          </Title>
          <Text style={{ 
            fontSize: '12px',
            color: '#333',
            display: 'block'
          }}>
            Tốt nghiệp loại: Giỏi
          </Text>
        </div>

        {/* Certificates */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{
            borderBottom: '3px solid #7cb342',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Title level={3} style={{ 
              color: '#7cb342',
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              CHỨNG CHỈ
            </Title>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <Text strong style={{ 
              display: 'block',
              color: '#333',
              fontSize: '13px'
            }}>
              Chứng chỉ ACCA (Chartered Certified Accountants)
            </Text>
            <Text style={{ 
              fontSize: '12px',
              color: '#666',
              float: 'right',
              marginTop: '-18px'
            }}>
              2022
            </Text>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <Text strong style={{ 
              display: 'block',
              color: '#333',
              fontSize: '13px'
            }}>
              Chứng chỉ CIA (Certified Internal Auditor)
            </Text>
            <Text style={{ 
              fontSize: '12px',
              color: '#666',
              float: 'right',
              marginTop: '-18px'
            }}>
              2021
            </Text>
          </div>
        </div>

        {/* References */}
        <div>
          <div style={{
            borderBottom: '3px solid #7cb342',
            paddingBottom: '8px',
            marginBottom: '20px'
          }}>
            <Title level={3} style={{ 
              color: '#7cb342',
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              NGƯỜI GIỚI THIỆU
            </Title>
          </div>
          
          <Text strong style={{ 
            display: 'block',
            color: '#333',
            fontSize: '13px',
            marginBottom: '3px'
          }}>
            Ông Đỗ Minh Anh
          </Text>
          <Text style={{ 
            fontSize: '12px',
            color: '#333',
            display: 'block',
            marginBottom: '3px'
          }}>
            Kế toán trưởng
          </Text>
          <Text style={{ 
            fontSize: '12px',
            color: '#666'
          }}>
            Điện thoại: 0123456789
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
import React, { useState } from 'react';
import { Card, Button, message, Upload, Modal } from 'antd';
import { InboxOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { uploadCV, updateCandidateCV } from '../../../api/cvApi';

const { Dragger } = Upload;

const CVSection = ({ profile, onUpdateProfile }) => {
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isCVModalVisible, setIsCVModalVisible] = useState(false);

  const handleSaveCV = async () => {
    if (!previewFile) return;
    try {
      setUploading(true);
      const token = localStorage.getItem('user_token');
      const cvUrl = await uploadCV(previewFile, token);
      const updatedProfile = await updateCandidateCV(profile.id, cvUrl);
      onUpdateProfile(updatedProfile);
      message.success('Lưu CV thành công');
      setPreviewFile(null);
      setShowPreview(false);
    } catch (error) {
      console.error('Lỗi khi lưu CV:', error);
      message.error('Lỗi khi lưu CV: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadCV = () => {
    if (profile?.attachedFile) {
      window.open(profile.attachedFile, '_blank');
    } else {
      message.warning('Không có CV để tải xuống');
    }
  };

  const handleViewCV = () => {
    if (profile?.attachedFile) {
      setIsCVModalVisible(true);
    } else {
      message.warning('Không có CV để hiển thị');
    }
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>CV của bạn</span>
          {profile?.attachedFile && (
            <Button
              type="primary"
              onClick={handleDownloadCV}
              icon={<DownloadOutlined />}
            >
              Tải CV của bạn
            </Button>
          )}
        </div>
      }
      style={{ marginTop: 24 }}
    >
      <Dragger
        name="file"
        multiple={false}
        showUploadList={false}
        beforeUpload={(file) => {
          if (file.type !== 'application/pdf') {
            message.error('Chỉ chấp nhận file PDF!');
            return false;
          }
          setPreviewFile(file);
          setShowPreview(true);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {profile?.attachedFile ? 'Kéo thả hoặc click để thay đổi CV' : 'Kéo thả file PDF hoặc click để tải lên'}
        </p>
      </Dragger>

      {showPreview && previewFile && (
  <>
    <div style={{ marginTop: 16 }}>
      <embed
        src={URL.createObjectURL(previewFile)}
        type="application/pdf"
        width="100%"
        style={{ minHeight: '800px' }}
      />
    </div>
    <div style={{ marginTop: 16, textAlign: 'center' }}>
      <Button type="primary" loading={uploading} disabled={uploading} onClick={handleSaveCV}>
        {uploading ? 'Đang lưu...' : 'Lưu CV'}
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        disabled={uploading}
        onClick={() => {
          setShowPreview(false);
          setPreviewFile(null);
        }}
      >
        Hủy
      </Button>
    </div>
  </>
)}


      {!showPreview && profile?.attachedFile && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={handleViewCV}
          >
            Xem CV
          </Button>
        </div>
      )}

      <Modal
        title="Xem CV"
        visible={isCVModalVisible}
        onCancel={() => setIsCVModalVisible(false)}
        width={1000}
        footer={[
          <Button key="close" onClick={() => setIsCVModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        styles={{
          body: { maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' },
        }}
      >
        <embed
          src={profile?.attachedFile}
          type="application/pdf"
          width="100%"
          style={{ minHeight: '800px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
        />
      </Modal>
    </Card>
  );
};

export default CVSection;
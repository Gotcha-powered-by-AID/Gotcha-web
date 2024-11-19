package aid.gotcha.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "final")
public class ReportEntity {
    @Id
    private Long reportId; // report_id에 해당하는 필드
    private String plateString; // plate_string
    private String firstCaptureTime; // first_capture_time
    private String lastCaptureTime; // last_capture_time
    private Double latitude; // latitude
    private Double longitude; // longitude
    private String firstImageUrl; // first_image_url
    private String lastImageUrl; // last_image_url
    private String firstDeviceId; // first_device_id
    private String lastDeviceId; // last_device_id
    private String firstCroppedUrl; // first_cropped_url
    private String secondCroppedUrl; // last_cropped_url
    private Boolean reportBool; // report_bool

    public Long getReportId() {
        return reportId;
    }
    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getPlateString() {
        return plateString;
    }
    public void setPlateString(String plateString) {
        this.plateString = plateString;
    }

    public String getFirstCaptureTime() {
        return firstCaptureTime;
    }
    public void setFirstCaptureTime(String firstCaptureTime) {
        this.firstCaptureTime = firstCaptureTime;
    }

    public String getLastCaptureTime() {
        return lastCaptureTime;
    }
    public void setLastCaptureTime(String lastCaptureTime) {
        this.lastCaptureTime = lastCaptureTime;
    }

    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getFirstImageUrl() {
        return firstImageUrl;
    }
    public void setFirstImageUrl(String firstImageUrl) {
        this.firstImageUrl = firstImageUrl;
    }

    public String getLastImageUrl() {
        return lastImageUrl;
    }
    public void setLastImageUrl(String lastImageUrl) {
        this.lastImageUrl = lastImageUrl;
    }

    public String getFirstDeviceId() {
        return firstDeviceId;
    }
    public void setFirstDeviceId(String firstDeviceId) {
        this.firstDeviceId = firstDeviceId;
    }

    public String getLastDeviceId() {
        return lastDeviceId;
    }
    public void setLastDeviceId(String lastDeviceId) {
        this.lastDeviceId = lastDeviceId;
    }

    public String getFirstCroppedUrl() {
        return firstCroppedUrl;
    }
    public void setFirstCroppedUrl(String firstCroppedUrl) {
        this.firstCroppedUrl = firstCroppedUrl;
    }

    public String getSecondCroppedUrl() {
        return secondCroppedUrl;
    }
    public void setSecondCroppedUrl(String secondCroppedUrl) {
        this.secondCroppedUrl = secondCroppedUrl;
    }

    public Boolean getReportBool() {
        return reportBool;
    }
    public void setReportBool(Boolean reportBool) {
        this.reportBool = reportBool;
    }
}

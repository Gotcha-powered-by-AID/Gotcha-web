package aid.gotcha.service;

import aid.gotcha.entity.ReportEntity;
import aid.gotcha.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // 모든 보고서 조회
    public List<ReportEntity> getAllReports() {
        return reportRepository.findAll();
    }
}

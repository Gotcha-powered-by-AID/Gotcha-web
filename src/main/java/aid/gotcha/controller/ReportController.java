package aid.gotcha.controller;

import aid.gotcha.entity.ReportEntity;
import aid.gotcha.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://gotcha-aid.site/") // 리액트 애플리케이션 주소
@RestController
@RequestMapping("/api/data")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // 모든 보고서 조회
    @GetMapping
    public List<ReportEntity> getReports() {
        return reportService.getAllReports();
    }
}

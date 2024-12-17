
# Gotcha Web

AI 기반 불법주정차 자동 신고 서비스 **Gotcha**의 관리자용 DB조회 웹입니다. 클라우드 서버에서 분석되어 불법주정차로 확정된 신고 내역을 조회할 수 있습니다. 

*db 주요 정보(db 비밀번호 포함)가 담긴 application.properties 파일은 .gitignore로 설정하여 해당 파일은 확인 불가합니다.

---

## 📚 프로젝트 개요

### 주요 기능
- **지역선택, 지역검색**: 원하는 지역을 선택하거나 검색. (해당 프로젝트에서의 관리자는 서대문구에만 권한을 가짐)
- **날짜 필터링**: 원하는 날짜 기간을 설정하여 필터링.
- **차량 번호판 검색**: 차량 번호판을 검색.
- **상세정보 조회**: 각 데이터의 체크박스를 선택하여 해당 데이터의 차량 번호판, 위치, 시간 정보와 신고된 사진 두장 확인.

---

## 🛠️ 실행 방법

### 1. EC2 생성 및 설정
RDS와 연결합니다.

보안그룹을 설정합니다: 모든 ip(0.0.0.0/0)에 대해 HTTP(80), 스프링부트(8080) 포트를 엽니다.

### 2. 스프링부트 배포
Controller의 CORS를 설정합니다:
```plaintext
@CrossOrigin(origins = “<URL-주소>")
```
프로젝트를 빌드합니다:
```bash
./gradlew build
```
생성된 .jar 파일을 EC2로 업로드합니다:
```bash
scp -i "your-key.pem" target/your-app.jar ec2-user@<EC2-공용-IPv4>:/home/ec2-user/
```

### 3. 리액트 배포
axios.get 코드를 수정합니다:
```plaintext
axios.get('http://<EC2-공용-IPv4>:8080/api/data')
```
프로젝트를 빌드합니다:
```bash
npm run build
```
생성된 /build 디렉토리를 EC2로 전송합니다:
```bash
scp -i "your-key.pem" -r build/ ec2-user@<EC2-공용-IPv4>:/home/ec2-user/
```

### 4. EC2 설정
웹서버(Nginx)를 설치합니다.
```bash
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```
Nginx 설정 파일을 수정합니다:
```bash
sudo vi /etc/nginx/nginx.conf
```
```plaintext
server {
    listen 80;
    server_name <EC2-공용-IPv4>;

    location / {
        root /home/ec2-user/build;
        index index.html;
        try_files $uri /index.html;
    }
}
```
Nginx를 재시작합니다:
```bash
sudo systemctl restart nginx
```

### 5. 웹 접속
브라우저에서 http://<URL-주소>로 웹페이지 접속

---

## 📁 디렉토리 구조
```
📂 Gotcha-web                   
├── 📂 gradle/wrapper           # Gradle 실행 설정 파일
├── 📂 node_modules             # 의존성 모듈
├── 📂 src                      # 소스 코드 디렉토리
│   ├── 📂 main                 # 메인 소스 코드
│   │   ├── 📂 gotcha           # 리액트 소스 코드
│   │   └── 📂 java/aid/gotcha  # 핵심 비즈니스 로직
├── build.gradle                # Gradle 빌드 설정 파일
├── README.md                   # 프로젝트 설명 파일
└── ...
```

---

## 🌟 주요 파일 설명
- **`src/main/java/aid/gotcha/controller/ReportController.java`**: 클라이언트와 서버 간의 HTTP 요청/응답을 관리하는 REST API의 컨트롤러.
- **`src/main/resources/application.properties`**: 데이터베이스 연결 및 JPA 관련 설정을 정의한 파일. 단, 보안을 위해 해당 파일은 공개되지 않음.
- **`src/main/gotcha/src/Main.js`**: 애플리케이션 컴포넌트를 렌더링하고 API 호출을 통해 백엔드에서 데이터를 가져와 화면에 표시.

---

## 🧪 테스트 환경
- **React Native**
- **IntelliJ**

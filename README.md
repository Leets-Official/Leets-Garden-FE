# Leets-Garden
<div>
<img width="470" alt="" src="">
</div>


## 📌Leets-Garden 프로젝트 소개
Leets zero100 2기, 토이 프로젝트
>🔥 동아리 정기 모임과 스터디를 원활하게 진행하고 출석 관리할 수 있는 서비스!</br>
>🔥 **동아리 정기회의 + 스터디 출석체크 서비스는 출석 프로세스를 간소화하는 것을 목표**로 합니다.

## 개발 인원 및 기간
> 개발 기간 : 2023/11/16 ~ 2023/12/07 (3주 프로젝트)</br>
> 개발 인원 : FE 2명 / BE 5명

## 📚기술 스택
<div align=center> 

<img src="https://img.shields.io/badge/springboot 3.1.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
<br>
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<br>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
 <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>


## 주소
- Swagger : http://3.39.24.69:8080/swagger-ui/index.html
- Front-End server : http://3.27.217.93:8000
- Back-End server : http://ec2-3-39-24-69.ap-northeast-2.compute.amazonaws.com:8080
- notion : https://www.notion.so/Leets-Garden-21199de7eb1b4aa9b4444916434469d6?pvs=4

## 주요 기능

1. **로그인 시스템**
    - 사용자는 기존에 주어진 아이디/비밀번호로 로그인할 수 있어야 합니다.
    - 비밀번호는 암호화하여 안전하게 보관해야 합니다.

2. **`CREATE`**
    - 관리자(각 팀의 리더)는 정기 모임 및 스터디 출석 관리 권한을 가집니다.
    - 불참자를 표시하는 게 아닌, 참여자에 한하여 출석 체크를 표시합니다.
    - 모임 및 스터디 날짜, 시간, 장소 등의 세부정보가 있습니다.<br>
3. **`READ`**
    - 모든 사용자의 스터디 및 정기 모임 누적 참여 수치를 보여줄 수 있어야 합니다.
    - 참여 수치는 깔끔하고, 명시적으로 볼 수 있어야 합니다.
    - 동아리에 소속되지 않은 사람은 조회할 수 없습니다.<br>
4. **`UPDATE`**
    - 관리자는 정기 모임 및 스터디의 세부사항을 수정할 수 있어야 합니다.

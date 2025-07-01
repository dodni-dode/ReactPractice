usecaseDiagram
    actor 사용자 as User
    actor 관리자 as Admin

    rectangle 시스템 {
        User --> (회원 가입 및 로그인)
        User --> (은행 계좌 연동)
        User --> (거래 내역 조회 및 잔돈 계산)
        User --> (투자 설정 변경)
        User --> (투자 내역 및 포트폴리오 조회)
        시스템 --> (자동 투자 실행)
    }

    Admin --> (시스템 모니터링)

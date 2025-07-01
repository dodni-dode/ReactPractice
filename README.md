flowchart TD
  %% ───── 액터 ───────────────────────────
  guest[비회원]:::actor
  user[회원]:::actor
  S1[OAuth Provider]:::ext
  F1[CODEF&nbsp;API]:::ext
  I1[한국투자증권&nbsp;API]:::ext

  %% ───── 온보딩 & 로그인 ────────────────
  guest -->|"회원가입"| user
  guest -->|"소셜 회원가입"| S1 --> user

  user -->|"로그인"| dashboard[대시보드]
  user -->|"소셜 로그인"| S1 --> dashboard

  %% ───── 핵심 플로우 ───────────────────
  subgraph 시스템
    bank_link[은행&nbsp;계좌&nbsp;연동]
    tx_fetch[계좌&nbsp;내역&nbsp;조회<br/>＋&nbsp;잔돈&nbsp;계산]
    invest_setting[투자&nbsp;설정&nbsp;/&nbsp;변경]
    auto_invest[자동&nbsp;투자&nbsp;실행]
    portfolio[투자&nbsp;내역&nbsp;&amp;&nbsp;포트폴리오&nbsp;조회]
    profile[일반&nbsp;설정&nbsp;/&nbsp;프로필&nbsp;관리]
    unbind[계좌&nbsp;연결&nbsp;해제&nbsp;&amp;<br/>재설정]
    push[푸시&nbsp;알림&nbsp;(VitePWA)]
  end

  %% ───── 시스템 내 흐름 ────────────────
  dashboard --> bank_link
  bank_link --> F1
  F1 --> tx_fetch
  tx_fetch --> invest_setting
  invest_setting --> auto_invest
  auto_invest --> I1
  I1 --> portfolio
  dashboard --> profile
  dashboard --> unbind
  portfolio --> push --> dashboard

  %% ───── 스타일 ────────────────────────
  classDef actor fill:#ffdce0,stroke:#c00,stroke-width:1;
  classDef ext fill:#fff5b1,stroke:#b59b00,stroke-width:1;
  class guest,user,S1,F1,I1 actor
  class S1,F1,I1 ext

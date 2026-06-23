const VAT_RATE = 0.1;
const MANWON = 10000;
const CHEONMAN = 10000000;
const EOK = 100000000;

const packages = {
  diagnostic: {
    label: "사전 검토형",
    description: "매입 전 검토, 리모델링 가능성, 사업성 빠른 판단",
    fit: "매입 전 검토, 리모델링 가능성 검토, 공사비·수익성 빠른 판단이 필요한 프로젝트",
    engagement: "단기 자문, 회의 1~3회, 보고서 중심",
    scope: "대지·법규 기초검토, 사업성 검토, 예산 프레임, 리스크 검토, 개발 방향 제안",
    excludes: "본 PM 계약 전 사전검토 상품이며, 설계·시공·현장관리 실행은 제외",
    feeText: "300만~1,500만원 정액",
    baseRange: [300, 1500],
    rateRange: [0, 0],
    minimum: 300,
    intensity: "low",
    defaultMonths: 1,
    defaultCost: 500000000,
  },
  lite: {
    label: "의사결정 지원형",
    description: "월 1~2회 회의와 주요 문서 검토 중심",
    fit: "건축주 경험이 있고 설계자·시공사가 안정적이라 의사결정 지원 위주가 필요한 경우",
    engagement: "월 1~2회 회의, 주요 문서 검토, 필요 시 월 1회 내외 현장 방문",
    scope: "설계 방향 검토, 예산 검토, 견적 비교, 계약조건 체크, 주요 이슈 자문",
    excludes: "현장관리, 기성검토, 품질관리, 분쟁대응은 제외 또는 제한",
    feeText: "월 150만~250만원 또는 총 1,500만~3,000만원",
    baseRange: [1500, 3000],
    rateRange: [0.003, 0.005],
    minimum: 1500,
    intensity: "low",
    defaultMonths: 6,
    defaultCost: 800000000,
  },
  standard: {
    label: "일반 관리형",
    description: "기획, 설계관리, 견적비교, 공사관리, 준공정산",
    fit: "단독주택, 근린생활시설, 꼬마빌딩, 사옥, 소형 리모델링 등 일반 소규모 건축",
    engagement: "정기회의, 월 2~4회 또는 격주~주간 현장 방문, 공정·비용·설계변경 관리",
    scope: "기획, 설계자 선정, 설계관리, 견적비교, 시공사 선정, 계약조건 검토, 공정회의, 기성검토, 준공정산",
    excludes: "PF, 임대, 매각, 상주관리, 분쟁, 정밀 VE는 별도 옵션",
    feeText: "월 250만~450만원 또는 총 2,500만~5,000만원",
    baseRange: [2500, 5000],
    rateRange: [0.003, 0.006],
    minimum: 2500,
    intensity: "base",
    defaultMonths: 8,
    defaultCost: 1000000000,
  },
  intensive: {
    label: "고관여 관리형",
    description: "공사비 검토, VE, 민원관리, 주간회의 등 고관여",
    fit: "건축주 경험 부족, 공사비 리스크 큼, 시공사 신뢰도 낮음, 민원·인허가 난도가 있는 프로젝트",
    engagement: "주간회의, 주 1~2회 현장 방문, 공정·기성·변경관리 강화",
    scope: "Standard PM + 공사비 세부검토 + VE + 민원관리 + 금융기관 대응 + 클레임 1차 대응",
    excludes: "PF 실행 대행, 임대·매각 중개, 법률대리, 세무자문은 제외",
    feeText: "월 450만~700만원 또는 총 5,000만~9,000만원",
    baseRange: [5000, 9000],
    rateRange: [0.004, 0.008],
    minimum: 5000,
    intensity: "high",
    defaultMonths: 10,
    defaultCost: 2000000000,
  },
  development: {
    label: "개발 통합관리형",
    description: "PF, 임대, 운영준비, 매각준비까지 보는 개발형",
    fit: "수익형 부동산, 임대 후 매각, PF 필요, 개발사업 성격이 강한 프로젝트",
    engagement: "사업기획부터 PF, 설계, 시공, 준공, 임대, 매각 준비까지 프로젝트별 협의",
    scope: "Intensive PM + PF 자료 대응 + 임대전략 + 운영준비 + 매각준비 + 투자자·금융기관 커뮤니케이션",
    excludes: "직접 대출알선, 부동산 중개, 법률·세무 대리, 매각 성과보수는 별도 계약",
    feeText: "월 700만~1,200만원 이상 또는 총 7,000만원~1억 5천만원 이상",
    baseRange: [7000, 15000],
    rateRange: [0.003, 0.006],
    minimum: 7000,
    intensity: "high",
    defaultMonths: 12,
    defaultCost: 3000000000,
  },
};

const pmTasks = [
  { phase: "A. 사업 착수·기획", no: 1, title: "사업 목표 정리", tag: "기본", description: "실사용, 임대, 매각, 종교시설, 근생, 주거, 사옥 등 건축주의 목적을 정리해 설계·예산·일정 기준을 세웁니다." },
  { phase: "A. 사업 착수·기획", no: 2, title: "사업 범위 정의", tag: "기본", description: "대지, 연면적, 층수, 용도, 필수 공간, 예산 한도, 준공 희망일, 품질 수준을 정리해 설계자·시공사 전달 기준을 만듭니다." },
  { phase: "A. 사업 착수·기획", no: 3, title: "초기 예산 프레임 작성", tag: "기본", description: "설계비, 인허가비, 시공비, 감리비, 철거비, 부담금, 예비비, PM비를 포함한 총사업비 구조를 잡습니다." },
  { phase: "A. 사업 착수·기획", no: 4, title: "전체 마스터 일정 수립", tag: "기본", description: "설계, 인허가, 견적, 계약, 착공, 골조, 마감, 준공, 입주까지의 큰 일정을 구성합니다." },
  { phase: "A. 사업 착수·기획", no: 5, title: "대지·법규 기초 검토", tag: "기본/옵션", description: "건폐율, 용적률, 용도지역, 도로, 주차, 정화조, 소방, 장애인 편의시설 등 주요 제약을 확인합니다. 심층 검토는 옵션입니다." },
  { phase: "A. 사업 착수·기획", no: 6, title: "사업성 검토", tag: "옵션", description: "임대수익, 매각가, 공사비, 금융비, 세금, 보유기간을 반영해 투자 타당성을 검토합니다." },
  { phase: "A. 사업 착수·기획", no: 7, title: "리스크 목록 작성", tag: "기본", description: "인허가 지연, 공사비 상승, 민원, 지질·철거, 설계변경, 시공사 리스크를 사전에 정리합니다." },

  { phase: "B. 설계자 선정·설계관리", no: 8, title: "설계 과업지시서 작성", tag: "기본", description: "건축주 요구사항을 공간 구성, 예산, 일정, 품질, 우선순위 기준으로 문서화합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 9, title: "설계사 후보 추천·비교", tag: "기본", description: "설계사 포트폴리오, 유사 프로젝트 경험, 설계비, 소통 역량을 비교합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 10, title: "설계계약 조건 검토", tag: "기본", description: "설계 범위, 납품 도면, 인허가 포함 여부, 설계변경 범위, 추가비 조건을 검토합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 11, title: "기본설계 검토 회의 운영", tag: "기본", description: "평면, 동선, 면적, 구조, 외관, 주차, 설비 공간을 건축주 관점에서 검토합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 12, title: "설계 예산 적합성 검토", tag: "기본", description: "설계가 예산 범위 안에서 구현 가능한지 확인하고 과도한 외장재, 구조, 설비 계획을 점검합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 13, title: "설계 VE 검토", tag: "옵션", description: "동일 기능을 유지하면서 공사비를 낮추거나 유지관리성을 높이는 대안을 제시합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 14, title: "인테리어·브랜딩 방향 연계", tag: "옵션", description: "근생, 사옥, 병원, 교회, 카페 등 운영 콘셉트가 중요한 경우 외부 디자인·브랜딩과 설계를 연계합니다." },
  { phase: "B. 설계자 선정·설계관리", no: 15, title: "설계변경 의사결정 관리", tag: "기본", description: "건축주 요청, 인허가 조건, 예산 초과 등 변경 사유와 비용 영향을 정리합니다." },

  { phase: "C. 인허가·견적·시공사 선정", no: 16, title: "인허가 일정 관리", tag: "기본", description: "설계자가 수행하는 인허가 진행상황을 체크하고 지연 이슈를 건축주에게 보고합니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 17, title: "인허가 보완사항 관리", tag: "기본", description: "구청, 소방, 교통, 위생, 장애인 편의 등 보완 요청사항을 정리하고 설계자 대응을 관리합니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 18, title: "시공사 후보군 구성", tag: "기본", description: "공사 규모, 용도, 난이도에 맞는 시공사 후보를 구성합니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 19, title: "견적 요청서 작성", tag: "기본", description: "도면, 물량, 공사범위, 제외범위, 지급조건, 공사기간, 하자조건을 포함한 비교 가능한 견적 기준을 만듭니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 20, title: "시공사 견적 비교", tag: "기본", description: "총액뿐 아니라 공종별 금액, 누락항목, 가설비, 철거비, 외장재, 설비비, 부가세 포함 여부를 비교합니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 21, title: "공사비 적정성 검토", tag: "기본/옵션", description: "기본 비교는 기본 PM에 포함하고, 물량산출서 수준의 정밀 검토는 옵션으로 구분합니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 22, title: "시공사 인터뷰·실사", tag: "기본/옵션", description: "유사 현장, 재무 안정성, 현장소장 역량, 하자 대응 경험을 확인합니다. 현장 실사 동행은 옵션입니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 23, title: "계약조건 협상 지원", tag: "기본", description: "착공일, 준공일, 지체상금, 선급금, 기성지급, 하자보증, 설계변경 단가, 보험, 안전관리 조건을 협의합니다." },
  { phase: "C. 인허가·견적·시공사 선정", no: 24, title: "공사계약서 검토", tag: "기본/옵션", description: "표준계약서 수준 체크는 기본, 변호사 검토나 특약 작성은 옵션 또는 외부 전문가 연계로 봅니다." },

  { phase: "D. 착공 준비", no: 25, title: "착공 전 킥오프 회의", tag: "기본", description: "건축주, 설계자, 감리자, 시공사, PM 간 역할과 보고체계를 정리합니다." },
  { phase: "D. 착공 준비", no: 26, title: "공정표 검토", tag: "기본", description: "시공사가 제출한 공정표가 현실적인지, 주요 의사결정 시점이 반영되었는지 검토합니다." },
  { phase: "D. 착공 준비", no: 27, title: "지급 일정표 검토", tag: "기본", description: "계약금, 선급금, 중도기성, 잔금 지급 구조를 공정률과 연계해 검토합니다." },
  { phase: "D. 착공 준비", no: 28, title: "현장 관리체계 설정", tag: "기본", description: "주간회의, 월간보고, 사진보고, 이슈관리표, 변경관리표, 기성검토 프로세스를 수립합니다." },
  { phase: "D. 착공 준비", no: 29, title: "착공 신고·현장 준비 체크", tag: "기본", description: "착공 관련 서류, 가설울타리, 현장사무소, 안전표지, 민원 안내 등을 확인합니다." },
  { phase: "D. 착공 준비", no: 30, title: "주변 민원 사전 대응", tag: "옵션", description: "민원 가능성이 높은 경우 사전 고지문, 협의, 대응창구를 운영합니다." },

  { phase: "E. 공사 진행 관리", no: 31, title: "정기 공정회의 운영", tag: "기본", description: "주간 또는 격주 단위로 공정, 비용, 품질, 이슈를 점검하고 회의록으로 책임소재를 명확히 합니다." },
  { phase: "E. 공사 진행 관리", no: 32, title: "현장 방문 점검", tag: "기본", description: "계약상 정한 빈도에 따라 현장을 방문해 공정 진행, 품질 이슈, 안전 이슈, 의사결정 필요사항을 확인합니다." },
  { phase: "E. 공사 진행 관리", no: 33, title: "공정 지연 관리", tag: "기본", description: "지연 사유, 만회대책, 건축주 의사결정 지연 여부, 날씨·자재·인력 문제를 구분해 관리합니다." },
  { phase: "E. 공사 진행 관리", no: 34, title: "기성 청구 검토", tag: "기본", description: "시공사가 청구한 기성이 실제 공정률과 맞는지 확인해 과다 지급을 방지합니다." },
  { phase: "E. 공사 진행 관리", no: 35, title: "설계변경·추가공사 관리", tag: "기본", description: "추가공사의 필요성, 단가, 범위, 책임 주체를 검토해 구두 지시로 비용이 늘어나는 것을 방지합니다." },
  { phase: "E. 공사 진행 관리", no: 36, title: "자재 승인 관리", tag: "기본", description: "주요 마감재, 창호, 외장재, 설비기기 등 건축주 승인이 필요한 항목을 정리합니다." },
  { phase: "E. 공사 진행 관리", no: 37, title: "품질 이슈 관리", tag: "기본", description: "균열, 누수, 단차, 마감 불량, 도면 불일치 등 이슈를 기록하고 조치 완료 여부를 추적합니다." },
  { phase: "E. 공사 진행 관리", no: 38, title: "안전·민원 이슈 모니터링", tag: "기본", description: "PM이 안전관리 책임자가 되는 것은 아니지만, 건축주 관점에서 중대 리스크를 모니터링합니다." },
  { phase: "E. 공사 진행 관리", no: 39, title: "공사비 변경내역 관리", tag: "기본", description: "당초 계약금액, 승인된 추가공사, 보류 항목, 예상 정산금액을 계속 업데이트합니다." },
  { phase: "E. 공사 진행 관리", no: 40, title: "상주 또는 준상주 현장관리", tag: "옵션", description: "매일 또는 주 2~3회 이상 현장에 나가 관리하는 업무로, 기본 PM과 별도 비용으로 책정합니다." },
  { phase: "E. 공사 진행 관리", no: 41, title: "공사 클레임·분쟁 대응", tag: "옵션", description: "공기연장, 추가공사비, 하자 책임, 계약해지 등 분쟁성 이슈는 별도 업무로 구분합니다." },
  { phase: "E. 공사 진행 관리", no: 42, title: "금융기관·대출기관 대응", tag: "옵션", description: "기성 확인, 감정평가, 대출 실행, 담보 설정 관련 커뮤니케이션을 지원합니다." },

  { phase: "F. 준공·인수인계", no: 43, title: "준공 전 사전점검", tag: "기본", description: "마감, 설비, 누수, 배수, 창호, 전기, 소방, 외부 포장 등 인수 전 체크리스트를 운영합니다." },
  { phase: "F. 준공·인수인계", no: 44, title: "펀치리스트 작성", tag: "기본", description: "보완해야 할 항목을 사진과 함께 정리하고 시공사 조치 완료 여부를 확인합니다." },
  { phase: "F. 준공·인수인계", no: 45, title: "사용승인 일정 관리", tag: "기본", description: "설계자·감리자·시공사가 준비해야 할 준공 서류와 사용승인 일정을 관리합니다." },
  { phase: "F. 준공·인수인계", no: 46, title: "준공서류 확인", tag: "기본", description: "사용승인서, 감리완료보고서, 하자보증서, 시험성적서, 준공도서, 설비 매뉴얼 등을 확인합니다." },
  { phase: "F. 준공·인수인계", no: 47, title: "최종 정산 검토", tag: "기본", description: "계약금액, 기성 지급액, 추가공사비, 감액 항목, 잔금 지급 조건을 정리합니다." },
  { phase: "F. 준공·인수인계", no: 48, title: "하자보증·유지관리 인수", tag: "기본", description: "하자보증기간, 보증증권, 주요 설비 연락처, 유지관리 주의사항을 건축주에게 인계합니다." },
  { phase: "F. 준공·인수인계", no: 49, title: "입주·운영 준비 지원", tag: "옵션", description: "가구, 사인, 집기, 보안, 청소, 통신, 임대차 입점 등 운영 준비를 지원합니다." },
  { phase: "F. 준공·인수인계", no: 50, title: "준공 후 하자점검", tag: "옵션", description: "준공 후 1개월, 3개월, 6개월, 1년 점검을 별도 패키지로 운영합니다." },
];

const options = [
  {
    id: "deepReview",
    category: "개발·금융",
    label: "대지·법규 심층 검토",
    amount: 400 * MANWON,
    range: "300만~700만원",
    description: "용도지역, 건폐율, 용적률, 도로, 주차, 소방, 장애인, 정화조 등 인허가 리스크를 사전 검토합니다.",
  },
  {
    id: "feasibility",
    category: "개발·금융",
    label: "사업성 검토 / 개발수지 작성",
    amount: 700 * MANWON,
    range: "500만~1,200만원",
    description: "임대수익, 매각가, 공사비, 금융비, 세금, 보유기간을 반영해 사업수지와 판단 기준을 정리합니다.",
  },
  {
    id: "pfPackage",
    category: "개발·금융",
    label: "PF 자료 패키지 작성",
    amount: 600 * MANWON,
    range: "400만~1,200만원",
    description: "금융기관 제출용 사업개요, 수지표, 일정, 공정률, 담보·상환 구조 자료를 정리합니다.",
    caution: "대출 알선이 아니라 자료 작성 및 커뮤니케이션 지원으로 표현합니다.",
  },
  {
    id: "finance",
    category: "개발·금융",
    label: "금융기관 대응 지원",
    amount: 300 * MANWON,
    range: "건별 200만~500만원",
    description: "금융기관 질의, 기성·대출 실행 관련 자료, 감정평가 대응 자료를 정리하고 커뮤니케이션을 지원합니다.",
    basis: "대출 알선이나 금융 자문이 아니라 자료 정리와 커뮤니케이션 지원 범위이므로 월정액이 아닌 건별 정액으로 낮춰 산정했습니다. 반복·장기 대응은 별도 월정액 협의가 필요합니다.",
  },
  {
    id: "ve",
    category: "설계·공사비",
    label: "설계 VE",
    amount: 600 * MANWON,
    range: "400만~1,200만원",
    description: "품질·안전·법규를 낮추지 않는 범위에서 공사비 절감 대안과 설계 조정안을 검토합니다.",
  },
  {
    id: "costReview",
    category: "설계·공사비",
    label: "정밀 공사비 검토",
    amount: 500 * MANWON,
    range: "300만~800만원",
    description: "공종별 내역, 단가, 물량, 누락·중복 항목을 검토해 견적 협상과 계약 판단을 지원합니다.",
  },
  {
    id: "bid",
    category: "설계·공사비",
    label: "시공사 입찰 패키지 운영",
    amount: 600 * MANWON,
    range: "400만~1,000만원",
    description: "견적요청서, 질의응답, 견적 비교표, 시공사 인터뷰, 우선협상 기준을 운영합니다.",
  },
  {
    id: "contract",
    category: "설계·공사비",
    label: "계약특약 구조화",
    amount: 300 * MANWON,
    range: "200만~700만원",
    description: "추가공사, 설계변경, 기성, 하자, 지체, 정산 기준을 계약 특약 형태로 정리합니다.",
    caution: "법률 대리나 변호사 검토를 대체하지 않습니다.",
  },
  {
    id: "siteWeekly",
    category: "현장관리",
    label: "주 1회 현장관리",
    amount: 350 * MANWON,
    range: "월 250만~450만원",
    monthly: true,
    description: "주 1회 현장 방문, 공정회의, 현장 이슈 기록, 기성·변경사항 1차 검토를 수행합니다.",
  },
  {
    id: "siteSemi",
    category: "현장관리",
    label: "주 2~3회 준상주 관리",
    amount: 600 * MANWON,
    range: "월 500만~900만원",
    monthly: true,
    description: "주 2~3회 현장 점검, 품질·일정·기성·민원 대응을 강화해 관리 밀도를 높입니다.",
  },
  {
    id: "resident",
    category: "현장관리",
    label: "상주 PM",
    amount: 1200 * MANWON,
    range: "월 1,000만~1,500만원 이상",
    monthly: true,
    description: "전담 인력 상주 또는 이에 준하는 방식으로 현장 의사결정과 리스크 대응을 상시 관리합니다.",
  },
  {
    id: "claim",
    category: "현장관리",
    label: "민원·클레임 1차 대응",
    amount: 300 * MANWON,
    range: "월 200만~400만원",
    monthly: true,
    description: "민원 기록, 이해관계자 커뮤니케이션, 시공사 협의, 쟁점 정리 등 1차 대응을 지원합니다.",
  },
  {
    id: "lease",
    category: "임대·운영·매각",
    label: "임대전략·임차관리",
    amount: 400 * MANWON,
    range: "300만~800만원 또는 월 200만~400만원",
    description: "임대 조건, 타깃 업종, 일정, 마케팅 자료, 중개사 협업, 임차인 조건 검토를 관리합니다.",
    caution: "직접 중개가 아니라 자료관리, 일정관리, 조건검토, 외부 중개사 협업관리입니다.",
  },
  {
    id: "operation",
    category: "임대·운영·매각",
    label: "입주·운영 준비",
    amount: 500 * MANWON,
    range: "300만~1,000만원",
    description: "입주, 시설관리, 보안, 청소, 통신, 사인, 인테리어 조율 등 운영 전환 업무를 정리합니다.",
  },
  {
    id: "sale",
    category: "임대·운영·매각",
    label: "매각전략·IM·실사대응",
    amount: 700 * MANWON,
    range: "500만~1,500만원",
    description: "매각전략, IM 자료, 실사자료, 매수자 질의 대응 자료, 중개사 협업 일정을 관리합니다.",
    caution: "매각 성과보수는 별도 계약 검토가 필요합니다.",
  },
  {
    id: "addonDesign",
    category: "패키지 보강 업무",
    label: "설계관리 보강",
    amount: 300 * MANWON,
    range: "200만~500만원",
    description: "설계 과업지시서, 설계사 비교, 설계계약 조건, 기본설계 검토 회의, 설계변경 의사결정까지 묶어 보강합니다.",
    basis: "실비정액가산식 취지에 맞춰 단기 기획·설계관리 투입 1~2회 회의와 문서검토 기준으로 산정했습니다.",
  },
  {
    id: "addonPermitBid",
    category: "패키지 보강 업무",
    label: "인허가·견적·계약 보강",
    amount: 500 * MANWON,
    range: "300만~800만원",
    description: "인허가 보완사항, 시공사 후보군, 견적 요청서, 견적 비교, 계약조건 협상, 계약서 기본 체크를 보강합니다.",
    basis: "단순 견적 비교 공개 서비스는 25만~50만원 수준이나, 본 항목은 인허가·계약조건까지 묶은 PM 보강업무라 300만~800만원 구간으로 조정했습니다.",
  },
  {
    id: "addonKickoff",
    category: "패키지 보강 업무",
    label: "착공 준비 보강",
    amount: 250 * MANWON,
    range: "200만~400만원",
    description: "착공 전 킥오프, 공정표·지급 일정표 검토, 현장 보고체계, 착공 신고·현장 준비 체크를 보강합니다.",
    basis: "착공 전 단기 점검 업무라 월정액보다 건별 정액이 적합하며, 현장관리 월정액보다 낮게 책정했습니다.",
  },
  {
    id: "addonConstruction",
    category: "패키지 보강 업무",
    label: "공사 진행 관리 보강",
    amount: 250 * MANWON,
    range: "월 200만~350만원",
    monthly: true,
    description: "정기 공정회의, 현장 방문 점검, 공정 지연, 기성 청구, 설계변경·추가공사, 자재 승인, 품질 이슈, 공사비 변경내역 관리를 보강합니다.",
    basis: "공사 중 반복 투입 업무는 월정액이 합리적입니다. 다만 주 1회 현장관리 옵션보다 낮은 보강형 업무로 책정했습니다.",
  },
  {
    id: "addonCompletion",
    category: "패키지 보강 업무",
    label: "준공·정산 보강",
    amount: 300 * MANWON,
    range: "200만~500만원",
    description: "준공 전 사전점검, 펀치리스트, 사용승인 일정, 준공서류, 최종 정산, 하자보증·유지관리 인수를 보강합니다.",
    basis: "준공 단계 단기 집중 검토 업무로, 하자점검 회차별 비용보다 높고 월정 현장관리보다 낮은 구간으로 조정했습니다.",
  },
  {
    id: "addonBranding",
    category: "패키지 보강 업무",
    label: "인테리어·브랜딩 연계",
    amount: 300 * MANWON,
    range: "200만~700만원",
    description: "근생, 사옥, 병원, 교회, 카페 등 운영 콘셉트가 중요한 경우 외부 디자인·브랜딩 방향과 건축 설계를 연결합니다.",
    basis: "전문 디자인 용역이 아니라 PM 조율 업무이므로 외부 브랜딩 제작비와 분리해 낮은 정액 보강비로 책정했습니다.",
  },
  {
    id: "addonDefect",
    category: "패키지 보강 업무",
    label: "준공 후 하자점검",
    amount: 150 * MANWON,
    range: "1회 100만~300만원",
    description: "준공 후 1개월, 3개월, 6개월, 1년 등 필요한 회차별로 하자점검과 조치 확인을 수행합니다.",
    basis: "기준서의 준공 후 하자점검 권고 금액인 1회 100만~300만원 범위에서 기본 회차 기준으로 낮은 중간값을 적용했습니다.",
  },
];

const packageOptionRules = {
  diagnostic: {
    included: ["deepReview", "feasibility"],
    recommended: ["addonDesign", "addonPermitBid"],
  },
  lite: {
    included: [],
    recommended: ["addonPermitBid", "addonKickoff", "addonCompletion", "costReview", "contract"],
  },
  standard: {
    included: ["addonDesign", "addonPermitBid", "addonKickoff", "addonConstruction", "addonCompletion"],
    recommended: ["costReview", "bid", "contract", "ve", "addonBranding", "addonDefect"],
  },
  intensive: {
    included: ["addonDesign", "addonPermitBid", "addonKickoff", "addonConstruction", "addonCompletion", "costReview", "ve", "contract", "siteWeekly", "claim"],
    recommended: ["siteSemi", "pfPackage", "finance", "addonBranding", "addonDefect"],
  },
  development: {
    included: ["addonDesign", "addonPermitBid", "addonKickoff", "addonConstruction", "addonCompletion", "addonBranding", "feasibility", "pfPackage", "finance", "lease", "operation", "sale"],
    recommended: ["resident", "siteSemi", "ve", "costReview", "addonDefect"],
  },
};

const optionTaskTitlesShownElsewhere = new Set([
  "사업성 검토",
  "설계 VE 검토",
  "주변 민원 사전 대응",
  "상주 또는 준상주 현장관리",
  "공사 클레임·분쟁 대응",
  "금융기관·대출기관 대응",
  "입주·운영 준비 지원",
]);

const packageTaskNumbers = {
  diagnostic: [1, 2, 3, 4, 5, 7],
  lite: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 15, 16, 17, 19, 20, 21, 23, 24],
  standard: [
    1, 2, 3, 4, 5, 7,
    8, 9, 10, 11, 12, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
    43, 44, 45, 46, 47, 48,
  ],
  intensive: [
    1, 2, 3, 4, 5, 7,
    8, 9, 10, 11, 12, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
    43, 44, 45, 46, 47, 48,
  ],
  development: [
    1, 2, 3, 4, 5, 7,
    8, 9, 10, 11, 12, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
    43, 44, 45, 46, 47, 48, 50,
  ],
};

const costBrackets = [
  { max: 500000000, label: "5억 이하", baseRange: [2000, 3500], rateRange: [0.005, 0.008], totalRange: [2500, 4000] },
  { max: 1500000000, label: "5억~15억", baseRange: [3000, 5000], rateRange: [0.004, 0.007], totalRange: [3500, 6500] },
  { max: 3000000000, label: "15억~30억", baseRange: [4500, 7000], rateRange: [0.003, 0.005], totalRange: [5000, 8500] },
  { max: 5000000000, label: "30억~50억", baseRange: [6000, 9000], rateRange: [0.0025, 0.004], totalRange: [7000, 11000] },
  { max: 10000000000, label: "50억~100억", baseRange: [8000, 15000], rateRange: [0.002, 0.0035], totalRange: [10000, 18000] },
  { max: Infinity, label: "100억 이상", baseRange: [12000, 22000], rateRange: [0.0015, 0.003], totalRange: [0, 0] },
];

const intensityWeights = {
  low: 0.25,
  base: 0.5,
  high: 0.8,
};

const intensityDescriptions = {
  low: "자문형: 월 1~2회 회의, 주요 문서 검토, 필요 시 제한적 현장 방문",
  base: "관리형: 격주~주간 회의, 공정·비용·설계변경 관리, 월 2~4회 현장 점검",
  high: "고관여형: 주 1~2회 현장 방문, 공사비·기성·VE·민원·클레임 1차 대응 강화",
};

const deliverables = [
  "사업범위 정리표",
  "초기 예산 프레임",
  "마스터 일정표",
  "견적 비교표",
  "회의록 및 이슈리스트",
  "변경관리표",
  "기성검토 의견",
  "준공 전 펀치리스트",
  "최종 정산 검토표",
];

const raciItems = [
  ["설계 품질 및 인허가 도서", "설계자", "PM 검토·조율", "건축주"],
  ["법정 감리", "감리자", "PM 일정·이슈 공유", "건축주"],
  ["시공 품질 및 안전관리", "시공사", "PM 현장 이슈관리", "건축주"],
  ["공사비 변경 승인", "건축주", "PM 검토·비교", "건축주"],
  ["기성 지급 판단", "건축주", "PM 검토 의견", "건축주"],
  ["법률·세무·중개 판단", "외부 전문가", "PM 자료·일정관리", "건축주"],
];

const elements = {
  resetProject: document.querySelector("#resetProject"),
  includeVat: document.querySelector("#includeVat"),
  projectRoot: document.querySelector("#projectRoot"),
  template: document.querySelector("#projectTemplate"),
  stickyBaseAmount: document.querySelector("#stickyBaseAmount"),
  stickyLinkedAmount: document.querySelector("#stickyLinkedAmount"),
  stickyOptionAmount: document.querySelector("#stickyOptionAmount"),
  stickyGrandAmount: document.querySelector("#stickyGrandAmount"),
};

function formatWon(amount) {
  const rounded = Math.round(amount / MANWON) * MANWON;

  if (rounded <= 0) return "0원";

  if (rounded < CHEONMAN) {
    return `${Math.round(rounded / MANWON).toLocaleString("ko-KR")}만원`;
  }

  const eok = Math.floor(rounded / EOK);
  const cheonman = Math.floor((rounded % EOK) / CHEONMAN);
  const man = Math.floor((rounded % CHEONMAN) / MANWON);
  const parts = [];

  if (eok > 0) parts.push(`${eok}억`);
  if (cheonman > 0 || eok > 0) parts.push(`${cheonman}천만원`);
  if (man > 0) parts.push(`${man}만원`);

  return parts.join(" ");
}

function formatPercent(rate) {
  return `${(rate * 100).toFixed(2).replace(/\.00$/, "")}%`;
}

function formatContractMoney(amount) {
  return `${formatWon(amount)}${amount > 0 ? "정" : ""}`;
}

function toContractList(items, fallback = "해당 없음") {
  if (!items.length) return `- ${fallback}`;
  return items.map((item) => `- ${item}`).join("\n");
}

function readNumber(input) {
  return Number(input.value || 0);
}

function pickFromRange(range, intensity) {
  const [min, max] = range;
  const weight = intensityWeights[intensity] ?? intensityWeights.base;
  return (min + (max - min) * weight) * MANWON;
}

function findCostBracket(managedCost) {
  return costBrackets.find((bracket) => managedCost <= bracket.max) ?? costBrackets.at(-1);
}

function getPackageOptionRule(packageKey) {
  return packageOptionRules[packageKey] ?? { included: [], recommended: [] };
}

function readDiagnosis(card) {
  return [...card.querySelectorAll(".diagnosis-choice.is-selected")].reduce((values, input) => {
    values[input.dataset.diagnosis] = input.dataset.value;
    return values;
  }, {});
}

function recommendPackage(card) {
  const values = readDiagnosis(card);
  const cost = readNumber(card.querySelector(".managed-cost"));
  const reasons = [];
  let score = 0;

  if (values.purpose === "precheck") {
    return {
      packageKey: "diagnostic",
      reasons: ["매입 전 또는 초기 검토 성격이 강해 사전 검토형이 적합합니다."],
      recommendedOptions: ["deepReview", "feasibility"],
    };
  }

  if (values.experience === "first") {
    score += 2;
    reasons.push("건축주가 처음 진행하는 프로젝트라 의사결정·계약·현장관리 지원 필요성이 큽니다.");
  } else if (values.experience === "some") {
    score += 1;
    reasons.push("일부 경험은 있으나 주요 문서와 계약조건 검토가 필요합니다.");
  }

  if (values.risk === "high") {
    score += 2;
    reasons.push("리스크 수준이 높아 공사비·기성·변경관리 강화가 필요합니다.");
  } else if (values.risk === "medium") {
    score += 1;
    reasons.push("보통 수준의 리스크가 있어 일반 관리형 이상이 적합합니다.");
  }

  if (values.finance === "yes") {
    score += 2;
    reasons.push("PF/대출 대응이 필요해 개발형 옵션 또는 개발 통합관리형 검토가 필요합니다.");
  }

  if (values.purpose === "rental" || values.purpose === "sale") {
    score += values.purpose === "sale" ? 2 : 1;
    reasons.push("임대·매각 목적이 있어 운영·매각 준비 업무를 별도 고려해야 합니다.");
  }

  if (values.stage === "construction") {
    score += 2;
    reasons.push("공사 진행 중인 프로젝트는 현장·기성·변경관리 비중이 높습니다.");
  } else if (values.stage === "bid") {
    score += 1;
    reasons.push("견적·시공사 선정 단계라 입찰·계약 조건 검토가 중요합니다.");
  }

  if (values.site === "semi") {
    score += 2;
    reasons.push("주 2~3회 이상 현장 관여가 필요해 준상주 또는 고관여 관리가 적합합니다.");
  } else if (values.site === "weekly") {
    score += 1;
    reasons.push("주 1회 이상 현장 관여가 필요합니다.");
  }

  if (cost <= 500000000) {
    reasons.push("5억 이하 소규모 사업은 요율보다 최소 투입비 기준이 중요합니다.");
  }

  let packageKey = "standard";
  if (score <= 1) packageKey = "lite";
  if (score >= 4) packageKey = "intensive";
  if (values.finance === "yes" && (values.purpose === "rental" || values.purpose === "sale" || score >= 5)) {
    packageKey = "development";
  }

  const recommendedOptions = [];
  if (values.stage === "bid") recommendedOptions.push("bid", "contract", "costReview");
  if (values.stage === "construction") recommendedOptions.push("siteWeekly", "addonConstruction");
  if (values.site === "semi") recommendedOptions.push("siteSemi");
  if (values.finance === "yes") recommendedOptions.push("pfPackage", "finance");
  if (values.purpose === "rental") recommendedOptions.push("lease", "operation");
  if (values.purpose === "sale") recommendedOptions.push("lease", "sale");
  if (values.risk === "high") recommendedOptions.push("ve", "claim");

  return { packageKey, reasons, recommendedOptions: [...new Set(recommendedOptions)] };
}

function calculateProject(card) {
  const packageKey = card.querySelector(".package-select").value;
  const selectedPackage = packages[packageKey];
  const optionRule = getPackageOptionRule(packageKey);
  const includedOptions = new Set(optionRule.included);
  const intensity = selectedPackage.intensity;
  const managedCost = readNumber(card.querySelector(".managed-cost"));
  const bracket = findCostBracket(managedCost);
  const months = Math.max(1, readNumber(card.querySelector(".duration-months")));
  const successFee = readNumber(card.querySelector(".success-fee"));
  const expenseFee = readNumber(card.querySelector(".expense-fee"));
  const manualAdjustment = readNumber(card.querySelector(".manual-adjustment"));

  const packageBaseFee = pickFromRange(selectedPackage.baseRange, intensity);
  const bracketBaseFee = packageKey === "diagnostic" ? 0 : pickFromRange(bracket.baseRange, intensity);
  const baseFee = Math.max(packageBaseFee, bracketBaseFee, selectedPackage.minimum * MANWON);
  const packageLinkedRate = pickFromRange(selectedPackage.rateRange, intensity) / MANWON;
  const bracketLinkedRate = packageKey === "diagnostic" ? 0 : pickFromRange(bracket.rateRange, intensity) / MANWON;
  const linkedRate = Math.max(packageLinkedRate, bracketLinkedRate);
  const linkedFee = managedCost * linkedRate;

  const optionFee = [...card.querySelectorAll(".option-check:checked")].reduce((sum, checkbox) => {
    const option = options.find((item) => item.id === checkbox.value);
    if (!option || includedOptions.has(option.id)) return sum;
    return sum + option.amount * (option.monthly ? months : 1);
  }, 0);
  const selectedPaidOptions = [...card.querySelectorAll(".option-check:checked")]
    .map((checkbox) => options.find((item) => item.id === checkbox.value))
    .filter((option) => option && !includedOptions.has(option.id));
  const includedOptionItems = options.filter((option) => includedOptions.has(option.id));

  const subtotal = Math.max(0, baseFee + linkedFee + optionFee + successFee + expenseFee + manualAdjustment);

  return {
    baseFee,
    linkedFee,
    optionFee: optionFee + successFee + expenseFee + manualAdjustment,
    subtotal,
    bracket,
    linkedRate,
    packageKey,
    selectedPackage,
    managedCost,
    months,
    successFee,
    expenseFee,
    manualAdjustment,
    selectedPaidOptions,
    includedOptionItems,
  };
}

function updateCard(card) {
  const result = calculateProject(card);
  const displayTotal = elements.includeVat.checked ? result.subtotal * (1 + VAT_RATE) : result.subtotal;
  const managedCost = readNumber(card.querySelector(".managed-cost"));
  const selectedPackage = packages[card.querySelector(".package-select").value];
  const intensity = selectedPackage.intensity;

  card.querySelector(".cost-readable").textContent = formatWon(managedCost);
  card.querySelector(".base-fee").textContent = formatWon(result.baseFee);
  card.querySelector(".linked-fee").textContent = formatWon(result.linkedFee);
  card.querySelector(".option-fee").textContent = formatWon(result.optionFee);
  card.querySelector(".project-total").textContent = formatWon(displayTotal);
  card.querySelector(".calculation-note").textContent =
    result.bracket.totalRange[0] === 0
      ? `${intensityDescriptions[intensity]} · ${result.bracket.label} 구간은 투입인력 기준 별도 산정을 권장합니다. 현재 연동 요율은 ${formatPercent(result.linkedRate)}입니다.`
      : `${intensityDescriptions[intensity]} · ${result.bracket.label} 구간 권장 총액은 ${result.bracket.totalRange[0].toLocaleString("ko-KR")}만~${result.bracket.totalRange[1].toLocaleString("ko-KR")}만원입니다. 현재 연동 요율은 ${formatPercent(result.linkedRate)}입니다.`;

  updateSummary(result);
}

function updateSummary(result) {
  const vat = elements.includeVat.checked ? result.subtotal * VAT_RATE : 0;

  elements.stickyBaseAmount.textContent = formatWon(result.baseFee);
  elements.stickyLinkedAmount.textContent = formatWon(result.linkedFee);
  elements.stickyOptionAmount.textContent = formatWon(result.optionFee);
  elements.stickyGrandAmount.textContent = formatWon(result.subtotal + vat);
}

function getVisibleTaskTitles(packageKey) {
  const allowedNumbers = new Set(packageTaskNumbers[packageKey] ?? packageTaskNumbers.standard);
  return pmTasks
    .filter((task) => allowedNumbers.has(task.no) && !optionTaskTitlesShownElsewhere.has(task.title))
    .map((task) => `${task.phase} - ${task.title}: ${task.description}`);
}

function getSelectedOptionLabels(result) {
  const included = result.includedOptionItems.map((option) => `포함: ${option.label}`);
  const selected = result.selectedPaidOptions.map((option) => `추가 선택: ${option.label} (${option.monthly ? "월 " : ""}${formatWon(option.amount)})`);
  return [...included, ...selected];
}

function buildProposalDraft(card, result) {
  const projectName = card.querySelector(".project-name").value || "프로젝트";
  const optionLines = getSelectedOptionLabels(result);
  const diagnosis = card.querySelector(".diagnosis-reason")?.textContent || "";
  const total = result.subtotal + (elements.includeVat.checked ? result.subtotal * VAT_RATE : 0);

  return `빅플래너 PM 제안서 문구

1. 제안 개요
${projectName}의 PM 수수료는 단순히 총사업비에 일정 요율을 곱하는 방식이 아니라, 프로젝트의 규모, 기간, 참여 강도, 리스크 수준, 업무 범위에 따라 산정합니다. 소규모 건축 프로젝트는 사업비 규모와 무관하게 사업 착수, 설계 조율, 견적 비교, 계약 검토, 공정회의, 기성 검토, 설계변경 관리, 준공 정산 등 고정 업무가 발생하므로, 기본 PM비를 우선 산정하고 사업비 연동 보수와 옵션업무비를 별도로 반영합니다.

2. 추천 패키지
- 선택 패키지: ${result.selectedPackage.label}
- 패키지 성격: ${result.selectedPackage.description}
- 추천/선택 사유: ${diagnosis || result.selectedPackage.fit}
- 참여 방식: ${result.selectedPackage.engagement}

3. 산정 기준
- 관리대상 사업비: ${formatWon(result.managedCost)}
- 예정 기간: ${result.months}개월
- 기본 PM비: ${formatWon(result.baseFee)}
- 사업비 연동 보수: ${formatWon(result.linkedFee)} (${formatPercent(result.linkedRate)})
- 옵션·가산: ${formatWon(result.optionFee)}
- 총 제안금액: ${formatWon(total)}

4. 포함 및 선택 업무
${toContractList(optionLines)}

5. 업무 경계
본 PM 용역은 건축주를 위한 사업관리, 일정관리, 비용관리, 품질관리, 커뮤니케이션 관리 및 의사결정 지원 업무입니다. 설계, 법정 감리, 시공, 구조·전기·소방 등 전문기술 검토, 법률대리, 세무자문, 금융상품 알선, 부동산 중개행위는 별도 전문가의 업무로 구분합니다.

6. 견적 유효조건
본 견적은 작성일로부터 30일간 유효하며, 관리대상 사업비, 용역기간, 현장방문 빈도, 회의 빈도, 업무범위, 옵션 선택이 변경되는 경우 재산정할 수 있습니다.`;
}

function buildScopeAttachment(card, result) {
  const taskItems = getVisibleTaskTitles(result.packageKey);
  const optionLines = getSelectedOptionLabels(result);
  const raciLines = raciItems.map(([area, responsible, pmRole, approver]) => `- ${area}: 책임 ${responsible} / PM 역할 ${pmRole} / 최종 승인 ${approver}`);

  return `PM 업무범위 별첨

1. 선택 패키지
- ${result.selectedPackage.label}: ${result.selectedPackage.description}

2. 기본 업무 범위
${toContractList(taskItems)}

3. 포함 및 추가 선택 업무
${toContractList(optionLines)}

4. 주요 산출물
${toContractList(deliverables)}

5. 책임 구분표(RACI 요약)
${toContractList(raciLines)}

6. 변경·추가업무 발생 기준
- 프로젝트 규모, 용도, 연면적, 층수, 예산, 품질수준, 설계범위 변경
- 회의, 현장방문, 보고서, 견적비교, 계약검토, 대외협의 횟수 증가
- 인허가, 민원, 분쟁, 금융기관 대응, 임대·매각 준비 등 계약 외 업무 발생
- 발주자 또는 제3자 사유로 인한 용역기간 연장

7. 지급 구조 예시
- 단계별 지급: 계약 체결 20%, 기본설계 완료 20%, 시공사 계약 20%, 공정 50% 20%, 사용승인·정산 20%
- 장기 프로젝트: 월정액 + 마일스톤 정산
- 실비와 외부 전문가 비용은 별도 정산`;
}

function buildContractDraft(card, result) {
  const projectName = card.querySelector(".project-name").value || "프로젝트";
  const includedOptions = result.includedOptionItems.map((option) => `${option.label}: ${option.description}`);
  const paidOptions = result.selectedPaidOptions.map((option) => {
    const feeText = `${option.monthly ? "월 " : ""}${formatWon(option.amount)}`;
    return `${option.label}: ${option.description} (${feeText})`;
  });
  const taskItems = getVisibleTaskTitles(result.packageKey);
  const vat = elements.includeVat.checked ? result.subtotal * VAT_RATE : 0;
  const total = result.subtotal + vat;

  return `PM(Project Management) 용역계약서 초안

발주자(이하 "갑")와 PM 수행자(이하 "을")는 아래 프로젝트에 관한 PM 용역계약을 체결하고, 신의와 성실의 원칙에 따라 계약상 의무를 이행하기로 한다.

계약 기본사항
1. 용역명: ${projectName} PM 용역
2. 프로젝트명: ${projectName}
3. 프로젝트 위치: [주소 기재]
4. 공사규모: [대지면적, 연면적, 층수, 주요 용도 기재]
5. 관리대상 사업비: ${formatWon(result.managedCost)}
6. 선택 패키지: ${result.selectedPackage.label}
7. 예정 용역기간: 계약 체결일로부터 ${result.months}개월
8. 계약금액: 공급가 ${formatWon(result.subtotal)} + VAT ${formatWon(vat)} = 총 ${formatWon(total)}
9. 계약일: [YYYY.MM.DD]

제1조 [목적]
본 계약은 갑의 건축사업 수행을 위하여 을이 사업관리, 일정관리, 비용관리, 품질관리, 커뮤니케이션 관리 및 의사결정 지원 업무를 수행하는 데 필요한 권리·의무, 업무범위, 대가, 책임범위를 정함을 목적으로 한다.

제2조 [계약문서의 구성 및 우선순위]
1. 본 계약의 계약문서는 본 계약서, 별첨 과업범위표, 산출내역서, 회의록 또는 변경합의서, 기타 갑과 을이 서명 또는 날인한 문서로 구성한다.
2. 계약문서 간 내용이 서로 충돌하는 경우, 특별히 달리 정하지 않는 한 변경합의서, 계약서, 별첨 과업범위표, 산출내역서 순으로 우선 적용한다.
3. 구두 지시, 문자, 이메일, 메신저 등은 계약금액 또는 업무범위를 변경하는 효력을 갖지 않으며, 변경은 제14조의 절차에 따른다.

제3조 [용어의 정의]
1. "PM 용역"이란 갑의 의사결정을 지원하고 프로젝트의 일정, 비용, 품질, 리스크, 커뮤니케이션을 관리하는 업무를 말한다.
2. "기본 업무"란 제5조 및 별첨 과업범위표에 포함된 업무를 말한다.
3. "추가 업무"란 본 계약 체결 후 갑의 요청 또는 프로젝트 사정 변경으로 새로 발생하거나 선택한 옵션 업무를 말한다.
4. "관리대상 사업비"란 본 계약의 PM비 산정 기준이 되는 설계비, 인허가비, 철거비, 시공비, 인테리어 공사비, 부담금, 예비비 등 건축 관련 비용을 말하며, 별도 합의가 없는 한 토지비, 취득세, 금융비, 매각가, 법률·세무·중개수수료는 제외한다.

제4조 [프로젝트 개요 및 용역 수행 방식]
1. 선택 패키지의 성격: ${result.selectedPackage.description}
2. 적합 프로젝트: ${result.selectedPackage.fit}
3. 참여 방식: ${result.selectedPackage.engagement}
4. 주요 범위: ${result.selectedPackage.scope}
5. 제외 또는 제한 범위: ${result.selectedPackage.excludes}
6. 정기회의, 현장방문, 보고 방식은 선택 패키지의 성격을 기준으로 하되, 실제 수행 빈도는 갑과 을이 프로젝트 일정에 맞추어 협의한다.

제5조 [기본 업무 범위]
을은 선택 패키지에 따라 다음 기본 업무를 수행한다.
${toContractList(taskItems)}

제6조 [패키지 포함 업무]
아래 업무는 선택 패키지에 포함된 업무로 보며, 본 계약금액 산정 시 별도 추가비를 산정하지 않는다.
${toContractList(includedOptions)}

제7조 [추가 선택 업무]
갑이 선택한 아래 업무는 추가 업무로 본 계약 범위에 포함한다.
${toContractList(paidOptions)}

제8조 [업무 결과물 및 보고]
1. 을은 업무 수행 과정에서 필요한 경우 회의록, 이슈리스트, 일정표, 견적 비교표, 변경관리표, 기성검토 의견, 준공점검표, 정산검토 의견 등 업무 성격에 맞는 결과물을 제공한다.
2. 결과물의 형식은 문서, 표, 이메일, 회의록, 온라인 공유문서 등 프로젝트 운영에 적합한 방식으로 한다.
3. 을의 검토 의견은 갑의 의사결정을 지원하기 위한 관리 의견이며, 법정 설계·감리·시공·전문기술 검토를 대체하지 않는다.

제9조 [갑의 의무]
1. 갑은 을의 업무 수행에 필요한 사업 목적, 예산, 일정, 설계도서, 견적서, 계약서, 인허가 자료, 시공사 제출자료 등 관련 자료를 적시에 제공한다.
2. 갑은 설계자, 감리자, 시공사, 금융기관, 중개사, 외부 전문가 등 프로젝트 관계자와의 협의에 을이 참여하거나 자료를 확인할 수 있도록 협조한다.
3. 갑은 을이 제시한 검토 의견을 참고하여 최종 의사결정을 하며, 발주자 고유의 의사결정 책임은 갑에게 있다.
4. 갑의 자료 제공 지연, 의사결정 지연, 제3자 자료 미제공으로 인한 일정 지연 또는 추가 업무는 을의 귀책으로 보지 않는다.

제10조 [을의 의무]
1. 을은 계약 범위 내 업무를 선량한 관리자의 주의로 성실히 수행한다.
2. 을은 프로젝트의 주요 이슈, 일정 지연 가능성, 비용 증가 가능성, 의사결정 필요사항을 갑에게 보고한다.
3. 을은 갑의 승인 없이 갑을 대리하여 설계계약, 공사계약, 금융계약, 임대차계약, 매매계약을 체결하거나 금전 지급을 확정하지 않는다.
4. 을은 업무상 알게 된 갑의 사업정보와 자료를 제18조에 따라 관리한다.

제11조 [용역비 및 산출내역]
1. 기본 PM비: ${formatWon(result.baseFee)}
2. 사업비 연동 관리보수: ${formatWon(result.linkedFee)} (적용 요율 ${formatPercent(result.linkedRate)})
3. 추가 선택 업무 및 가산금: ${formatWon(result.optionFee)}
4. 공급가액 합계: ${formatWon(result.subtotal)}
5. 부가가치세: ${formatWon(vat)}
6. 총 계약 예정금액: ${formatWon(total)}
7. 위 금액은 현재 입력된 관리대상 사업비, 선택 패키지, 선택 옵션, 예정 용역기간을 기준으로 산정한 금액이며, 실제 계약 체결 시 산출내역서를 별첨한다.

제12조 [지급 방법]
1. 갑은 용역비를 아래 지급 방식 중 하나로 지급한다. 최종 방식은 계약 체결 시 선택한다.
   가. 단계별 지급: 계약 체결 시 20%, 설계자 선정 또는 기본설계 완료 시 20%, 시공사 선정·계약 체결 시 20%, 착공 후 공정 50% 시점 20%, 사용승인·정산 완료 시 20%
   나. 월정액 + 마일스톤 정산: 월정액 업무는 매월 말 청구하고, 단계별 또는 옵션 업무는 해당 업무 착수 또는 완료 시 청구한다.
2. 월정액 옵션이 포함된 경우, 해당 옵션 용역비는 예정 용역기간 ${result.months}개월을 기준으로 산정한다.
3. 갑이 지급기일을 지체하는 경우 을은 상당한 기간을 정하여 이행을 최고할 수 있으며, 지체가 계속될 때에는 업무를 일시 중지할 수 있다.

제13조 [실비 및 외부비용]
1. 교통비, 지방 출장비, 숙박비, 도면 출력비, 등본·인허가 서류 발급비, 외부 전문가 검토비 등 실비는 별도 정산한다.
2. 변호사, 세무사, 공인중개사, 구조·전기·소방 등 전문기술자, 감정평가사 등 외부 전문가 비용은 갑이 직접 계약하거나 사전 승인한 범위에서 별도 부담한다.

제14조 [업무 변경 및 추가 업무]
1. 다음 각 호의 사유가 발생한 경우 을은 용역기간 또는 용역비 조정을 요청할 수 있다.
   가. 프로젝트 규모, 용도, 연면적, 층수, 예산, 품질수준, 설계범위가 변경된 경우
   나. 갑의 요청으로 회의, 현장방문, 보고서, 견적비교, 계약검토, 대외협의 횟수가 현저히 증가한 경우
   다. 인허가, 민원, 분쟁, 금융기관 대응, 임대·매각 준비 등 계약 외 업무가 발생한 경우
   라. 용역기간이 갑 또는 제3자의 사유로 연장된 경우
2. 추가 업무는 갑과 을이 업무범위, 기간, 금액을 서면 또는 전자문서로 합의한 후 수행한다.

제15조 [업무 제외 및 책임 제한]
1. 본 용역은 건축주를 위한 사업관리 및 의사결정 지원 업무이며, 건축사법상 설계업무, 법정 감리업무, 건설업자의 시공업무, 구조·전기·소방 등 전문기술 검토, 법률대리, 세무자문, 금융상품 알선, 부동산 중개행위를 대체하지 않는다.
2. 을은 설계자, 감리자, 시공사, 관계전문기술자, 금융기관, 중개사 등 제3자의 고유 업무 결과에 대한 법정 책임을 부담하지 않는다.
3. 을의 검토 의견은 갑의 의사결정을 돕기 위한 참고자료이며, 최종 계약 체결, 비용 지급, 설계변경 승인, 시공사 선정, 임대·매각 조건 확정은 갑의 책임으로 한다.

제16조 [성과보수 및 특수 업무]
1. VE 절감액, PF 실행, 임대 성사, 매각 성과 등 성과보수는 본 계약에 포함하지 않으며 별도 특약으로 정한다.
2. VE 성과보수를 정하는 경우, 갑이 승인하고 설계자·시공사가 적용 가능하다고 확인한 대안 중 품질·안전·법규 저하 없이 최종 계약 또는 정산에 반영된 절감액을 기준으로 한다.
3. PF, 임대, 매각 관련 업무는 자료 작성, 일정관리, 조건검토, 외부 전문가 또는 중개사 협업관리 범위로 한정하며 직접 알선 또는 중개행위로 해석하지 않는다.

제17조 [자료 및 지식재산]
1. 갑이 제공한 도면, 견적서, 계약서, 사업자료의 소유권은 갑 또는 해당 권리자에게 있다.
2. 을이 작성한 회의록, 검토표, 관리표, 보고자료 등 결과물은 본 프로젝트의 목적 범위에서 갑이 사용할 수 있다.
3. 을은 갑의 사전 동의 없이 본 프로젝트 자료를 제3자에게 공개하지 않는다. 단, 법령상 요구, 분쟁 대응, 외부 전문가 검토에 필요한 최소 범위는 예외로 한다.

제18조 [비밀유지]
갑과 을은 본 계약 수행 과정에서 알게 된 상대방의 영업상·기술상·재무상 정보 및 프로젝트 자료를 상대방의 사전 동의 없이 제3자에게 누설하거나 계약 목적 외로 사용하지 않는다.

제19조 [계약기간, 중지 및 해지]
1. 본 계약기간은 계약 체결일부터 예정 용역기간 종료일까지로 한다. 다만 사용승인, 정산, 하자보증 인수 등 마무리 업무가 남은 경우 갑과 을은 필요한 범위에서 기간을 연장할 수 있다.
2. 갑 또는 을이 본 계약상 의무를 중대하게 위반하고 상대방이 상당한 기간을 정하여 시정을 요구하였음에도 시정하지 않는 경우 상대방은 계약을 해지할 수 있다.
3. 계약이 중도 해지되는 경우 갑은 해지 시점까지 수행된 업무와 이미 발생한 실비, 외부비용, 착수된 옵션 업무비를 정산하여 지급한다.

제20조 [불가항력]
천재지변, 전쟁, 감염병, 행정처분, 관계기관 지연, 파업, 자재수급 차질 등 당사자의 합리적 통제를 벗어난 사유로 업무 수행이 지연되는 경우, 해당 기간은 용역기간에서 합리적으로 조정한다.

제21조 [통지]
계약 관련 통지는 계약서에 기재된 주소, 이메일, 휴대전화, 메신저 등 갑과 을이 합의한 방식으로 할 수 있다. 다만 계약금액, 업무범위, 기간 변경은 기록이 남는 서면 또는 전자문서로 한다.

제22조 [분쟁 해결]
본 계약과 관련하여 분쟁이 발생한 경우 갑과 을은 우선 협의로 해결한다. 협의가 이루어지지 않는 경우 관할 법원은 [관할 법원 기재]로 한다.

제23조 [특약]
1. [특약사항 기재]
2. 본 계약서와 특약이 충돌하는 경우 명시적으로 달리 정한 특약이 우선한다.

별첨 1. 선택 패키지 및 기본 업무 범위
${toContractList(taskItems)}

별첨 2. 패키지 포함 업무
${toContractList(includedOptions)}

별첨 3. 추가 선택 업무
${toContractList(paidOptions)}

별첨 4. 산출내역
- 기본 PM비: ${formatWon(result.baseFee)}
- 사업비 연동 관리보수: ${formatWon(result.linkedFee)}
- 추가 선택 업무 및 가산금: ${formatWon(result.optionFee)}
- 공급가액: ${formatWon(result.subtotal)}
- VAT: ${formatWon(vat)}
- 총액: ${formatWon(total)}

위 계약의 성립을 증명하기 위하여 계약서 2부를 작성하고 갑과 을이 서명 또는 날인한 후 각 1부씩 보관한다.

갑(발주자)
주소:
상호/성명:
대표자:
연락처:
서명/날인:

을(PM 수행자)
주소:
상호/성명:
대표자:
연락처:
서명/날인:`;
}

function buildCombinedDocument(card, result) {
  return `${buildProposalDraft(card, result)}


============================================================
2부. PM 업무범위표
============================================================

${buildScopeAttachment(card, result)}


============================================================
3부. PM 용역계약서 초안
============================================================

${buildContractDraft(card, result)}`;
}

function populatePackageSelect(select) {
  Object.entries(packages).forEach(([value, item]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = item.label;
    select.append(option);
  });
}

function populatePackageCards(grid, select, card) {
  Object.entries(packages).forEach(([value, item]) => {
    const button = document.createElement("button");
    button.className = "package-card";
    button.type = "button";
    button.dataset.package = value;
    button.innerHTML = `
      <span>${item.label}</span>
      <strong>${item.feeText}</strong>
      <dl>
        <div><dt>대상</dt><dd>${item.fit}</dd></div>
        <div><dt>참여</dt><dd>${item.engagement}</dd></div>
        <div><dt>범위</dt><dd>${item.scope}</dd></div>
        <div><dt>제외</dt><dd>${item.excludes}</dd></div>
      </dl>
    `;

    button.addEventListener("click", () => {
      select.value = value;
      applyPackageDefaults(card, value);
      syncPackageCards(card);
      syncPmTasks(card);
      syncOptionCards(card);
      updateCard(card);
    });

    grid.append(button);
  });
}

function syncPackageCards(card) {
  const selected = card.querySelector(".package-select").value;
  card.querySelectorAll(".package-card").forEach((button) => {
    const isSelected = button.dataset.package === selected;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function syncOptionCards(card) {
  const packageKey = card.querySelector(".package-select").value;
  const optionRule = getPackageOptionRule(packageKey);
  const includedOptions = new Set(optionRule.included);
  const recommendedOptions = new Set(optionRule.recommended);

  card.querySelectorAll(".option-chip").forEach((chip) => {
    const checkbox = chip.querySelector(".option-check");
    const status = chip.querySelector(".option-status");
    const optionId = checkbox.value;
    const isIncluded = includedOptions.has(optionId);
    const isRecommended = recommendedOptions.has(optionId);
    const wasIncluded = chip.dataset.wasIncluded === "true";

    chip.classList.toggle("is-included", isIncluded);
    chip.classList.toggle("is-recommended", !isIncluded && isRecommended);
    checkbox.disabled = isIncluded;
    if (isIncluded) checkbox.checked = true;
    if (!isIncluded && wasIncluded) checkbox.checked = false;
    chip.dataset.wasIncluded = String(isIncluded);

    if (isIncluded) {
      status.textContent = "포함됨";
      status.dataset.status = "included";
    } else if (isRecommended) {
      status.textContent = "추천 옵션";
      status.dataset.status = "recommended";
    } else {
      status.textContent = "별도 선택";
      status.dataset.status = "optional";
    }
  });
}

function syncPmTasks(card) {
  const packageKey = card.querySelector(".package-select").value;
  populatePmTasks(card.querySelector(".pm-task-grid"), packageKey);
}

function updateDiagnosis(card) {
  const recommendation = recommendPackage(card);
  const packageName = packages[recommendation.packageKey].label;
  card.dataset.recommendedPackage = recommendation.packageKey;
  card.dataset.recommendedOptions = JSON.stringify(recommendation.recommendedOptions);
  card.querySelector(".diagnosis-package").textContent = `추천 패키지: ${packageName}`;
  card.querySelector(".diagnosis-reason").textContent =
    recommendation.reasons.length > 0
      ? recommendation.reasons.join(" ")
      : "프로젝트 조건상 기본적인 일반 관리형 검토가 적합합니다.";
}

function applyDiagnosis(card) {
  const packageKey = card.dataset.recommendedPackage || recommendPackage(card).packageKey;
  const recommendedOptions = JSON.parse(card.dataset.recommendedOptions || "[]");
  const packageSelect = card.querySelector(".package-select");

  packageSelect.value = packageKey;
  applyPackageDefaults(card, packageKey);
  syncPackageCards(card);
  syncPmTasks(card);
  syncOptionCards(card);

  recommendedOptions.forEach((optionId) => {
    const checkbox = card.querySelector(`.option-check[value="${optionId}"]`);
    if (checkbox && !checkbox.disabled) checkbox.checked = true;
  });

  updateCard(card);
}

function populatePmTasks(grid, packageKey) {
  const allowedNumbers = new Set(packageTaskNumbers[packageKey] ?? packageTaskNumbers.standard);
  const visibleTasks = pmTasks.filter(
    (task) => allowedNumbers.has(task.no) && !optionTaskTitlesShownElsewhere.has(task.title),
  );
  const phases = [...new Set(visibleTasks.map((task) => task.phase))];

  grid.innerHTML = "";

  phases.forEach((phase) => {
    const group = document.createElement("section");
    group.className = "pm-task-phase";
    group.innerHTML = `<h3>${phase}</h3>`;

    const list = document.createElement("div");
    list.className = "pm-task-phase__list";

    visibleTasks
      .filter((task) => task.phase === phase)
      .forEach((task) => {
        const article = document.createElement("article");
        article.className = "pm-task-card";
        article.innerHTML = `
          <div>
            <strong><small>${task.no}</small>${task.title}</strong>
            <span>${task.tag}</span>
          </div>
          <p>${task.description}</p>
        `;
        list.append(article);
      });

    group.append(list);
    grid.append(group);
  });
}

function populateOptionGrid(grid) {
  const categories = [...new Set(options.map((item) => item.category))];

  categories.forEach((category) => {
    const group = document.createElement("section");
    group.className = "option-category";
    group.innerHTML = `<h3>${category}</h3>`;

    const list = document.createElement("div");
    list.className = "option-category__list";

    options
      .filter((item) => item.category === category)
      .forEach((item) => {
        const label = document.createElement("label");
        label.className = "option-chip";
        label.innerHTML = `
          <input class="option-check" type="checkbox" value="${item.id}" />
          <span>
            <strong>${item.label}<i class="option-status" data-status="optional">별도 선택</i></strong>
            <small>기준 ${item.range} · 적용금액 ${item.monthly ? "월 " : ""}${formatWon(item.amount)}</small>
            <em>${item.description}</em>
            ${item.basis ? `<b class="option-basis">금액 근거: ${item.basis}</b>` : ""}
            ${item.caution ? `<b>${item.caution}</b>` : ""}
          </span>
        `;
        list.append(label);
      });

    group.append(list);
    grid.append(group);
  });
}

function applyPackageDefaults(card, packageKey) {
  const selectedPackage = packages[packageKey];
  card.querySelector(".managed-cost").value = selectedPackage.defaultCost;
  card.querySelector(".duration-months").value = selectedPackage.defaultMonths;
}

function createProject(initialPackage = "standard") {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".project-card");
  const packageSelect = fragment.querySelector(".package-select");
  const packageCardGrid = fragment.querySelector(".package-card-grid");
  const pmTaskGrid = fragment.querySelector(".pm-task-grid");
  const optionGrid = fragment.querySelector(".option-grid");

  populatePackageSelect(packageSelect);
  populatePackageCards(packageCardGrid, packageSelect, card);
  populateOptionGrid(optionGrid);

  packageSelect.value = initialPackage;
  applyPackageDefaults(fragment, initialPackage);
  populatePmTasks(pmTaskGrid, initialPackage);
  syncPackageCards(fragment);

  packageSelect.addEventListener("change", () => {
    applyPackageDefaults(card, packageSelect.value);
    syncPackageCards(card);
    syncPmTasks(card);
    syncOptionCards(card);
    updateCard(card);
  });

  fragment.querySelectorAll(".cost-step").forEach((button) => {
    button.addEventListener("click", () => {
      const input = card.querySelector(".managed-cost");
      input.value = Math.max(0, readNumber(input) + Number(button.dataset.step || 0));
      updateCard(card);
      updateDiagnosis(card);
    });
  });

  fragment.querySelectorAll(".diagnosis-choice").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("is-selected")));
    button.addEventListener("click", () => {
      const group = button.closest(".diagnosis-group");
      group.querySelectorAll(".diagnosis-choice").forEach((choice) => {
        const selected = choice === button;
        choice.classList.toggle("is-selected", selected);
        choice.setAttribute("aria-pressed", String(selected));
      });
      updateDiagnosis(card);
    });
  });

  fragment.querySelector(".apply-diagnosis").addEventListener("click", () => {
    applyDiagnosis(card);
  });

  fragment.querySelector(".document-generate").addEventListener("click", () => {
    const result = calculateProject(card);
    card.querySelector(".document-draft").value = buildCombinedDocument(card, result);
  });

  fragment.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", () => {
      updateCard(card);
      if (input.classList.contains("managed-cost")) updateDiagnosis(card);
    });
    input.addEventListener("change", () => {
      updateCard(card);
      if (input.classList.contains("managed-cost")) updateDiagnosis(card);
    });
  });

  elements.projectRoot.append(card);
  syncPackageCards(card);
  syncPmTasks(card);
  syncOptionCards(card);
  updateDiagnosis(card);
  updateCard(card);
}

function resetProject() {
  elements.projectRoot.innerHTML = "";
  createProject("standard");
}

elements.resetProject.addEventListener("click", resetProject);
elements.includeVat.addEventListener("change", () => {
  const card = elements.projectRoot.querySelector(".project-card");
  if (card) updateCard(card);
});

resetProject();

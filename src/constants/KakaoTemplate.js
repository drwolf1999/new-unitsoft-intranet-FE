const data = [
    // {
    //     "group": true,
    //     "tmplId": " contest_result",
    //     "print": "오늘 #{시험}에서 결과는 아래와 같습니다.\n" +
    //         "최고점 : #{최고점}\n" +
    //         "최하점 : #{최하점}\n" +
    //         "평균 : #{평균}\n" +
    //         "${학생} 점수 : ${점수}",
    //     "name": "대회 결과"
    // },
    {
        "group": true,
        "tmplId": "koi_contest",
        "print": "[유닛코딩학원](#{지점})\n" +
            "#{년도} KOI 대비반 시간표 안내\n" +
            "- 목표 : #{목표}\n" +
            "- 시간표\n!{시간표}\n\n" +
            "*신청인원 6명 미만은 반 개설이 안됩니다.\n" +
            "*수강신청문자로받습니다.(학생이름,학교명,O학년,O요일,O차)\n" +
            "#{연락처}로문자주시면 감사하겠습니다.",
        "name": "KOI 대회"
    },
    {
        "group": true,
        "tmplId": "usaco_contest",
        "print": "<< 유닛 코딩 대치 목동 USACO 대회대비 안내문>>\n♣USACO대회 준비반 설명회 및 개강 안내 ♣\n\n" +
            "▣ USACO(미국정보 올림피아드)▣\n" +
            "→ SW 분야의 영재를 Online 기반으로 선발하는 대회!\n" +
            "→ 미국 명문대학 CS 학과 및 IT융합전공을 목표로 공부하는 학생들이 갖추어야 할 필수 요건!!\n" +
            "→ Online Contest로 진행되며, 70개국이상 2000명 내외의 학생들이 참가하는 큰 대회 !!!\n" +
            "\n" +
            "▣ USACO 시험 과정 ▣\n" +
            "→Bronze 레벨부터 시작 →USACO Bronze -> USACO Silver -> USACO Gold ->\n" +
            "USACO(PLATINUM) 단계별 이동하여 레벨을 올리는 대회\n" +
            "\n" +
            "▣ #{기간} USACO 시험 일정 ▣\n" +
            "→!{시험일정}\n" +
            "\n" +
            "▣ #{기간} USACO 수업 일정\n" +
            "!{수업일정}\n" +
            "\n" +
            "▣ #{기간} USACO 수강 신청\n" +
            "소수 정예 ( 5명 이상시 개강)\n" +
            "\n" +
            "▣ #{기간} USACO 강사진\n" +
            "#{년도} USACO Gold Level 과정까지 입상시킨 전문 강사들\n" +
            "(영재고 출신, KOI, ACM 입상자)구성\n" +
            "\n" +
            "▣ #{기간} USACO 설명회 일정\n" +
            "→#{날짜}\n" +
            "▶장소:\n" +
            "→#{장소}\n" +
            "▶신청\n" +
            "#{연락처}",
        "name": "USACO 대회"
    },
    {
        "group": true,
        "tmplId": "team_before",
        "print": "[유닛코딩학원](대치)\n" +
            "#{수업} 안내\n" +
            "\n" +
            "시간표\n" +
            "!{시간표}\n" +
            "\n" +
            "*신청인원 4명 미만은\n" +
            "반 개설안됩니다.\n" +
            "*수강료 1-time(3시간) 기준 #{가격} 입니다.\n" +
            "*수강 신청 문자로 받습니다. (학생이름,학교명,O학년,O요일,O차)\n" +
            "#{연락처} 문자로 주시면 감사하겠습니다.^^ ",
        "name": "팀수업시험직보"
    },
    {
        "group": true,
        "tmplId": "team_plan",
        "print": "[유닛코딩학원](#{지점})\n" +
            "- #{학교}\n" +
            "- 팀수업 내용\n" +
            "- 일시 : #{날짜}\n" +
            "- 진도 : #{진도}\n" +
            "- 추가 내용 : #{추가내용}",
        "name": "팀수업예정"
    },
    {
        "group": true,
        "tmplId": "team_result",
        "print": "[유닛코딩학원](#{지점})\n" +
            "- #{학교}\n" +
            "- 일시 : #{날짜}\n" +
            "- 출석 : #{출석한사람}\n" +
            "- 결석 : #{결석한사람}\n" +
            "- 진도 : #{진도}\n" +
            "- 과제 : #{과제}\n" +
            "- 추가 내용 : #{추가내용}",
        "name": "팀수업결과"
    },
    {
        "group": false,
        "tmplId": "student_report",
        "print": "#{이름} 학생 오늘 수업한 내용 안내드립니다.\n\n수업 내용: #{수업}\n과제: #{과제} (#{마감일} 까지)",
        "name": "수업 종료 후"
    },
];

export default class KakaoTemplates {
    static templates = data;
}

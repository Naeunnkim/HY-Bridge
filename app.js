/**
 * Hy-Bridge 공통 모듈
 */
const StorageKeys = {
    SCHOOL_EVENTS: "hybridge_school_events_v1",
    OPPORTUNITIES: "hybridge_opportunities_v1"
};

// 초기 데이터 세팅 (데이터가 없을 경우에만)
function initData() {
    if (!localStorage.getItem(StorageKeys.SCHOOL_EVENTS)) {
        const defaultEvents = [
            { id: "e1", title: "사회학이론 중간고사", date: "2026-04-20", time: "09:00" }
        ];
        localStorage.setItem(StorageKeys.SCHOOL_EVENTS, JSON.stringify(defaultEvents));
    }
}

// 현재 활성화된 페이지 표시 (nav highlight)
function highlightNav() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initData();
    highlightNav();
});

/* -- 2. 로그 페이지 전용 스크립트 -- */

// 모달 열기/닫기
function toggleModal() {
    const modal = document.getElementById('writeModal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// AI 분석 시뮬레이션
function analyzeLog() {
    const input = document.getElementById('userInput').value;
    const btn = document.getElementById('analyzeBtn');
    
    if(!input.trim()) return alert("기록을 입력해주세요!");

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> 분석 중...';
    
    setTimeout(() => {
        // 결과 카드 업데이트
        const aiCard = document.getElementById('aiResult');
        const aiText = document.getElementById('aiConvertedText');
        
        // 예시용 변환 로직 (실제로는 API 호출 영역)
        aiText.innerText = `"${input.substring(0, 15)}... 등의 경험을 바탕으로, 협업 능력을 통해 성과를 달성함."`;
        
        aiCard.style.display = 'block';
        toggleModal(); // 모달 닫기
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> 분석 및 저장';
        
        // 입력창 비우기
        document.getElementById('userInput').value = "";
    }, 1500);
}

/* -- 3. 이력서 페이지 전용 스크립트 -- */

// 모달 제어 함수
function openExportModal() {
    document.getElementById('exportModal').style.display = 'block';
}

function closeExportModal() {
    document.getElementById('exportModal').style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('exportModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
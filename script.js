// script.js
// 假設 guestData 已經在 guests_data.js 中載入

/**
 * 查詢賓客資料並顯示結果
 */
function searchGuest() {
    // 1. 取得輸入的賓客姓名並清除前後空白
    const inputName = document.getElementById('guestName').value.trim();
    const resultBox = document.getElementById('resultBox');
    const chartImage = document.getElementById('chartImage');

    // 2. 清除上次的結果和高亮
    resultBox.innerHTML = '';
    resultBox.classList.remove('error');
    chartImage.classList.remove('highlight-table'); // 移除圖片的高亮效果

    if (inputName === '') {
        resultBox.innerHTML = `
            <p style="color:#D4AF37; font-weight:bold;">請輸入您的姓名進行查詢。</p>
        `;
        return;
    }

    // 3. 在資料中查詢賓客
    // 使用 .find() 查找第一個匹配的結果
    const foundGuest = guestData.find(guest => {
        // 為了更精準匹配，使用全名且不區分大小寫（如果適用）
        return guest.name.toLowerCase() === inputName.toLowerCase();
    });

    // 4. 根據查詢結果顯示內容
    if (foundGuest) {
        // 找到資料 - 顯示桌次並高亮座位圖
        const tableNumber = foundGuest.table;
        let noteHtml = foundGuest.note ? `<p style="font-size:0.9em; color:#C08080; margin-top:5px;">備註: ${foundGuest.note}</p>` : '';
        
        resultBox.innerHTML = `
            <div class="guest-info">
                親愛的 **${foundGuest.name}** 貴賓，您的桌次是：
            </div>
            <div class="table-display">${tableNumber}</div>
            ${noteHtml}
            <p style="font-size:0.85em; margin-top:10px; color:#555;">請參照下方的座位圖找到您的桌位。</p>
        `;

        // **實現座位高亮（簡易版）**
        // 由於我們只有一張圖片，這裡簡單地對圖片本身加上高亮邊框和動畫。
        // **備註：** 如果要實現精確的座位高亮，您需要一個向量圖 (SVG) 或在座位圖上為每個桌位定義座標區域。
        chartImage.classList.add('highlight-table');

        // **理想的高亮邏輯 (如果使用 SVG/Map 實現):**
        // const tableElement = document.getElementById(`table-${tableNumber}`);
        // if (tableElement) {
        //     tableElement.classList.add('highlight-active');
        // }

    } else {
        // 找不到資料 - 顯示錯誤提示
        resultBox.classList.add('error');
        resultBox.innerHTML = `
            <p style="font-size:1.2em; font-weight:bold;">
                找不到您的座位資料，請洽詢現場新人的招待人員協助入座
            </p>
        `;
    }
}

/**
 * 處理鍵盤 Enter 鍵事件
 */
function handleKeyPress(event) {
    // 檢查按下的鍵是否為 Enter 鍵 (keyCode 13 或 key 'Enter')
    if (event.keyCode === 13 || event.key === 'Enter') {
        searchGuest();
    }
}
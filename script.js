const startDate = new Date('2026-07-13');
const endDate = new Date();
const targetHours = 400; 

const specialDates = {
  '2026-07-21': { type: 'absent', remark: 'Absent' },
  '2026-08-10': { type: 'nowork', remark: 'No Work / Holiday' },
  '2026-08-11': { type: 'nowork', remark: 'No Work / Holiday' },
  '2026-08-21': { type: 'nowork', remark: 'No Work / Holiday' },
  '2026-08-31': { type: 'nowork', remark: 'No Work / Holiday' },
  '2026-08-18': { type: 'nowork', remark: 'No Work / Holiday' }
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function generateLogs() {
  const tableBody = document.getElementById('logTableBody');
  let totalRenderedHours = 0;
  let html = '';

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      let timeIn = '9:00 AM';
      let timeOut = '6:00 PM';
      let hours = 8;
      let badgeClass = 'badge-present';
      let remark = 'Present';

      if (specialDates[dateStr]) {
        const exception = specialDates[dateStr];
        timeIn = '-';
        timeOut = '-';
        hours = 0;
        remark = exception.remark;

        if (exception.type === 'absent') {
          badgeClass = 'badge-absent';
        } else if (exception.type === 'nowork') {
          badgeClass = 'badge-nowork';
        }
      }

      totalRenderedHours += hours;

      html += `
        <tr>
          <td><strong>${formattedDate}</strong></td>
          <td>${dayNames[dayOfWeek]}</td>
          <td>${timeIn}</td>
          <td>${timeOut}</td>
          <td>${hours > 0 ? hours + ' hrs' : '-'}</td>
          <td><span class="badge ${badgeClass}">${remark}</span></td>
        </tr>
      `;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  tableBody.innerHTML = html;
  document.getElementById('totalHours').innerText = `${totalRenderedHours} hrs`;

  const percentage = Math.min(((totalRenderedHours / targetHours) * 100), 100).toFixed(1);
  document.getElementById('progressText').innerText = `${totalRenderedHours} / ${targetHours} hrs (${percentage}%)`;
  document.getElementById('progressBarFill').style.width = `${percentage}%`;
}

window.onload = generateLogs;

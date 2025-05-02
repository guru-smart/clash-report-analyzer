document.addEventListener('DOMContentLoaded', () => {
    const firstPage = document.getElementById('firstPage');
    const secondPage = document.getElementById('secondPage');
    const lastWeekInput = document.getElementById('lastWeekFile');
    const currentWeekInput = document.getElementById('currentWeekFile');
    const processButton = document.getElementById('processButton');
    const backButton = document.getElementById('backButton');
    const exportButton = document.getElementById('exportButton');
    const resultsArea = document.getElementById('resultsArea');

    let updatedCurrentWeekData = [];
    let currentWeekHeaders = [];

    // Event: Process Button Click
    processButton.addEventListener('click', () => {
        const lastWeekFile = lastWeekInput.files[0];
        const currentWeekFile = currentWeekInput.files[0];

        if (!lastWeekFile || !currentWeekFile) {
            alert("Please select both last week's and current week's CSV files.");
            return;
        }

        firstPage.setAttribute('aria-hidden', 'true');
        firstPage.style.display = 'none';
        secondPage.setAttribute('aria-hidden', 'false');
        secondPage.style.display = 'block';

        resultsArea.innerHTML = '<p class="loading-message">Processing files...</p>';
        exportButton.hidden = true;

        // File reading logic here...
    });

    // Event: Back Button Click
    backButton.addEventListener('click', () => {
        secondPage.setAttribute('aria-hidden', 'true');
        secondPage.style.display = 'none';
        firstPage.setAttribute('aria-hidden', 'false');
        firstPage.style.display = 'block';

        lastWeekInput.value = '';
        currentWeekInput.value = '';
        resultsArea.innerHTML = '<p class="loading-message">Select files and click Process to see results.</p>';
        exportButton.hidden = true;
    });

    // Event: Export Button Click
    exportButton.addEventListener('click', () => {
        if (updatedCurrentWeekData.length === 0 || currentWeekHeaders.length === 0) {
            alert("No data to export.");
            return;
        }

        const csvContent = formatCSV(currentWeekHeaders, updatedCurrentWeekData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'updated_clash_results.csv';
        link.click();
    });

    // Utility Functions
    function formatCSV(headers, data) {
        const rows = [headers.join(',')];
        data.forEach(row => {
            const values = headers.map(header => `"${row[header] || ''}"`);
            rows.push(values.join(','));
        });
        return rows.join('\n');
    }
});

// Load common header elements
document.addEventListener('DOMContentLoaded', function() {
    // MathJax Configuration
    const mathJaxConfig = document.createElement('script');
    mathJaxConfig.textContent = `
        MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
                // tags: 'all',        // 'ams' = equation環境だけ番号, 'all' = $$ や \\[\\] も番号
                // tagSide: 'right',   // 'left' にすれば左寄せ
                // tagIndent: '0.8em'  // 式と番号の間隔
            }
        };
    `;
    document.head.appendChild(mathJaxConfig);

    // MathJax Script
    const mathJaxScript = document.createElement('script');
    mathJaxScript.id = 'MathJax-script';
    mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    mathJaxScript.async = true;
    document.head.appendChild(mathJaxScript);
}); 
// Load common header elements
document.addEventListener('DOMContentLoaded', function() {
    // MathJax Configuration
    const mathJaxConfig = document.createElement('script');
    mathJaxConfig.textContent = `
        MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
            }
        };
    `;
    document.head.appendChild(mathJaxConfig);

    // MathJax Script
    const mathJaxScript = document.createElement('script');
    mathJaxScript.id = 'MathJax-script';
    mathJaxScript.async = true;
    mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(mathJaxScript);
}); 
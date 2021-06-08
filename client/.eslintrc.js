module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
        'linebreak-style': 0,
        // "linebreak-style": ["error", "windows"], // CRLF
        'no-unused-vars': 1, // 정의 후 사용하지 않은 변수는 경고만 하기
        'no-use-before-define': 0, // 정의 전에 사용 금지
        'no-console': 0, // console 사용하기
        'no-tabs': 0, // tab 사용 안되는 rule
        // "quote-props": 0, // property에 quote를 씌우지 말아야하는 rule
        'operator-linebreak': 0, // 연산자는 라인 앞쪽에 위치해야하는 rule
        'comma-dangle': 0, // 마지막 요소에 ,를 붙여야하는 rule
        'no-param-reassign': 2, // 파라미터는 지역변수로 받아서 쓰라는 rule
        'import/prefer-default-export': ['off'], // export const 문을 쓸때 에러를 내는 rule 해제
        'react/prop-types': ['off'], // props의 타입체크를 처리에 proptypes가 아닌 typescript 사용 예정
        'react/jsx-wrap-multilines': 0, // jsx에서 여러 줄에 걸쳐서 정의할 때 복잡한 rule 해제
        'import/extensions': 0, // ts 파일을 불러오기 위해,
        camelcase: [0, { ignoreGlobals: false }], // 카멜케이스아닌 변수도 허용
        'no-restricted-syntax': ['warn', 'WithStatement'], // for in 사용
        'react/jsx-props-no-spreading': ['warn'], // props로 받은 것 바로 props로 넘기기 허용
        'class-methods-use-this': 2,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    ignorePatterns: ['node_modules/', '*.config.js'],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
};

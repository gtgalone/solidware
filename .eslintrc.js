module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "import"
    ],
    "rules": {
        "indent": ["error", 2],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }]
    },
    "env": {
        "browser": true,
        "node": true
    }
};
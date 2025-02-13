// 가격에 콤마
export const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


// 숫자 세자리
export const formatThreeDigit = (value) => {
    if (value < 100) {
        return value.toString().padStart(3, '0');
    }
    return value.toString();
}

// 숫자 반올림

export const formatRounding = (value) => {
    return Math.round(value).toString();
}
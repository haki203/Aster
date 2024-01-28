function formatPrice(so) {
    // Chuyển số thành chuỗi để dễ xử lý
    var chuoiSo = so.toString();

    // Tìm vị trí của dấu chấm thập phân
    var viTriChamThapPhan = chuoiSo.indexOf('.');

    // Nếu không có dấu chấm thập phân, thêm '.000'
    if (viTriChamThapPhan === -1) {
        chuoiSo += '.000';
    } else {
        // Nếu có dấu chấm thập phân, thêm đủ số lượng số 0 để có 3 chữ số thập phân
        while (chuoiSo.length - viTriChamThapPhan < 4) {
            chuoiSo += '0';
        }
    }

    return chuoiSo;
}
export { formatPrice };
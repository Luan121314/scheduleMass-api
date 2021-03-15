function countReservation(reservations: { companion: number }[]) {
    const listNumbers = reservations.map(reservation => reservation.companion + 1);
    let number = 0;
    listNumbers.forEach(item => {
        number+= item
    })

    return number;
}

export default countReservation;

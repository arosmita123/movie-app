function useGenIds(clickedGenres) {

    if (clickedGenres.length < 1) return "";

    const GenreIds = clickedGenres.map((gen) => gen.id)
    return GenreIds.reduce((accumulator, currentValue) => accumulator + "," + currentValue)
}

export default useGenIds
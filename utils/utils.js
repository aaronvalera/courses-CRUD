const isIdDuplicate = (courses, id) => {
    return courses.find(course => course.id === id);
};

const findElement = (courses, id) => {
    return courses.findIndex(course => course.id === parseFloat(id));
}

const orderByViews = (array, property) => {
    return [...array].sort((a, b) => a[property] - b[property]);
}

module.exports = {
    isIdDuplicate,
    findElement,
    orderByViews
}
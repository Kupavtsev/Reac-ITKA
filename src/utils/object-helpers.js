export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {

    return items.map(u => {
        // Если id не совпадает, то возвращем тот же самый объект 49, 30:30
        // 90 25:00 обращение к свойству через квадратные скобки u["id"]
        if (u[objPropName] === itemId) {
            // Возвращаем копию пользователя и меняем в нем элемент
            // 90 ...newObjProps может быть одно свойство, а может быть много
            return { ...u, ...newObjProps }
        }
        return u;
    })
}

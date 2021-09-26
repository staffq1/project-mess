class File {
    constructor(type, name, size, content = '', path = '') {
        this.type = type
        this.content = content
        this.name = name
        this.size = size
        this.path = path
    }
}
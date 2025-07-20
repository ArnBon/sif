// Middleware para limpiar el número antes de guardar
telefonoSchema.pre('save', function(next) {
    // Eliminar espacios, guiones y otros caracteres
    this.numero = this.numero.replace(/[^\d]/g, '');
    // Asegurar formato estándar (0 + código + número)
    if (!this.numero.startsWith('0')) {
    this.numero = '0' + this.numero;
    }
    
    next();
    });



    // Método para formato de visualización
telefonoSchema.methods.formatearNumero = function() {
    return `${this.codigo_pais} ${this.numero.substring(0, 4)}-${this.numero.substring(4)}`;
    };
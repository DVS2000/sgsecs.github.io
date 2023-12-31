var block = $('html')

new Vue({
    el: '#app',
    data() {
        return {
            isLoading: false,
            name_store: '',
            name_forn: '',
            phone: '',
            email: '',
            password: ''
        }
    },
    watch: {
    },
    methods: {
        validateInputs() {
            if (this.phone.trim() == null || this.phone.length < 9) {
                Snackbar.show({
                    text: 'Telefone inválido, deve somente 9 caracteres',
                    pos: 'top-center',
                    actionText: 'Ok'
                });

                return false;
            } else if (this.password.trim() == null || this.password.length < 6) {
                Snackbar.show({
                    text: 'Palavra-passe inválida, deve ter no mínimo 6 caracteres.',
                    pos: 'top-center',
                    actionText: 'Ok'
                });

                return false
            } else {
                return true;
            }
        },
        createStore() {
            if (this.validateInputs()) {
                var self = this;
                this.openBlock()

                $.ajax({
                    url: 'http://localhost:3333/api/v1/users',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        "firstName": self.name_forn.toString().split(' ')[0].trim(),
                        "secondName": self.name_forn.toString().split(' ')[1].trim(),
                        "phone": self.phone.trim(),
                        "email": self.email.trim(),
                        "tipoId": 2,
                        "password": self.password.trim()
                    })
                }).done(function (res) {
                    const data = Object.assign({}, res)
                    const id = data.data.id
                    $.ajax({
                        url: 'http://localhost:3333/api/v1/store',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "name": self.name_store.trim(),
                            "phone": self.phone.trim(),
                            "idForn": id
                        })
                    }).done(function() {
                        alert('terminou')
                    }).fail(function() {
                        self.closeBlock()
                        swal({
                            type: 'error',
                            title: `${res.status}`,
                            text: `${res.responseJSON.message}`,
                            confirmButtonText: 'Tente novamente',
                            padding: '2em'
                        })
                    })
                }).fail(function (res) {
                    console.log(res)
                    self.closeBlock()

                    swal({
                        type: 'error',
                        title: `${res.status}`,
                        text: `${res.responseJSON.message}`,
                        confirmButtonText: 'Tente novamente',
                        padding: '2em'
                    })
                })
            }
        },

        openBlock() {
            $(block).block({
                message: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
                fadeIn: 800,
                overlayCSS: {
                    backgroundColor: '#1b2024',
                    opacity: 0.8,
                    zIndex: 1200,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    color: '#fff',
                    zIndex: 1201,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });

        },
        closeBlock() {
            $(block).unblock()
        }
    }
})
var block = $('html')

new Vue({
    el: '#app',
    data() {
        return {
            isLoading: false,
            textBtn: 'Entrar',
            phone: '',
            password: ''
        }
    },
    watch: {
    },
    methods: {
        validateInputs() {
            if (this.phone.trim() == null || this.phone.length < 9) {
                Snackbar.show({
                    text: 'Telefone inválido, deve ter 9 caracteres',
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
        login() {
            if (this.validateInputs()) {
                //var self = this;
                this.openBlock()

                if(this.phone.trim() === "admin@gmail.com" && this.password.trim() === "123456") {
                    setTimeout(() => {
                        this.closeBlock()
                        window.location.href = '/'
                    }, 6000);
                } else {
                    this.closeBlock()
                    Snackbar.show({
                        text: 'Palavra-passe ou E-mail incorreto',
                        pos: 'top-center',
                        actionText: 'Ok'
                    });
                }

                
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
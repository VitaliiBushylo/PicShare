define(['knockout', 'vm/userDetailsViewModel', 'text!templates/UserDetailsTemplate'],
    function (ko, userDetailsViewModel, UserDetailsTemplate) {
        function createViewModel(params) {
            var vm = new userDetailsViewModel(params);
            vm.toggleLoading();
            return vm;
        }

        return { viewModel: { createViewModel: createViewModel }, template: UserDetailsTemplate };
    });
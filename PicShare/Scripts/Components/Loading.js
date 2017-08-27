define(['knockout', 'vm/loadingViewModel', 'text!templates/Loading'],
    function (ko, loadingViewModel, Loading) {
        function createViewModel(params) {
            var vm = new loadingViewModel(params);
            vm.initSubscribtion();
            return vm;
        }
        return { viewModel: { createViewModel: createViewModel }, template: Loading };
    });
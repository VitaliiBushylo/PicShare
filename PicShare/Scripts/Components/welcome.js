define(['knockout', 'vm/welcomeViewModel', 'text!templates/WelcomeTemplate'],
    function (ko, welcomeViewModel, WelcomeTemplate) {
        function createViewModel(params) {
            var vm = new welcomeViewModel(params);
            return vm;
        }

        return { viewModel: { createViewModel: createViewModel }, template: WelcomeTemplate };
    });
define(['knockout', 'vm/fileUploaderViewModel', 'text!templates/FileUploaderTemplate'],
    function (ko, fileUploaderViewModel, FileUploaderTemplate) {
        function createViewModel(params) {
            var vm = new fileUploaderViewModel(params);
            vm.init();
            return vm;
        }

        return { viewModel: { createViewModel: createViewModel }, template: FileUploaderTemplate };
    });
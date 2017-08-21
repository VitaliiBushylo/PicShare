define(['knockout', 'vm/boardViewModel', 'text!templates/BoardTmplate'],
    function (ko, boardViewModel, BoardTmplate) {
        function createViewModel(params) {
            var vm = new boardViewModel(params);
            return vm;
        }

        return { viewModel: { createViewModel: createViewModel }, template: BoardTmplate };
    });
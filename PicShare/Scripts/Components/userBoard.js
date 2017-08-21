define(['knockout', 'vm/boardViewModel', 'text!templates/BoardTemplate'],
    function (ko, boardViewModel, BoardTmplate) {
        function createViewModel(params) {
            var vm = new boardViewModel(params);            
            vm.retrieveUserBoard();
            return vm;
        }

        return { viewModel: { createViewModel: createViewModel }, template: BoardTmplate };
    });
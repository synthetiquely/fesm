(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        if (map.length === 0) {
            return 0;
        }

        let n = map.length;
        let m = map[0].length;
        let count = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (map[i][j] === 1) {
                    count++;
                    dfs(map, i, j);
                }
            }
        }

        function dfs(map, i, j) {
            let n = map.length;
            let m = map[0].length;

            if (i < 0 || j < 0 || i >= n || j >= m || map[i][j] === 0) {
                return;
            }

            map[i][j] = 0;
            dfs(map, i - 1, j);
            dfs(map, i + 1, j);
            dfs(map, i, j - 1);
            dfs(map, i, j + 1);
        }

        return count;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);

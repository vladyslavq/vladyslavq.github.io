#include <emscripten/emscripten.h>


#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN EMSCRIPTEN_KEEPALIVE void next_world_state(int* world, int rows, int cols) {
    int new_world[rows * cols];
    int coordinates[8][2] = {{-1, -1}, {-1, 0}, {-1, 1},
                             {0, -1},             {0, 1},
                             {1, -1}, {1, 0}, {1, 1}};
    int neighbours, ci, cj;

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            neighbours = 0;
            for (int c = 0; c < 8; c++) {
                ci = i + coordinates[c][0];
                cj = j + coordinates[c][1];
                if (ci >= 0 && ci < rows && cj >= 0 && cj < cols) {
                    neighbours += world[ci * cols + cj];
                }
            }
            if (neighbours < 2 || neighbours > 3) {
                new_world[i * cols + j] = 0;
            } else if (neighbours == 3) {
                new_world[i * cols + j] = 1;
            } else {
                new_world[i * cols + j] = world[i * cols + j];
            }
        }
    }
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            world[i * cols + j] = new_world[i * cols + j];
        }
    }
}
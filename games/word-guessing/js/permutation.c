#include <stdio.h>

void permute(int arr[], int left, int right) {
    if (left == right) {
        for (int i = 0; i <= right; i++)
            printf("%d ", arr[i]);
        printf("\n");
    } else {
        for (int i = left; i <= right; i++) {
            // Swap using index-based temp
            int temp = arr[left];
            arr[left] = arr[i];
            arr[i] = temp;

            permute(arr, left + 1, right);

            // Backtrack
            temp = arr[left];
            arr[left] = arr[i];
            arr[i] = temp;
        }
    }
}

int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\n", n);
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    printf("Permutations are:\n");
    permute(arr, 0, n - 1);

    return 0;
}
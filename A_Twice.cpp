#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        vector<int> array(n);

        for (int i = 0; i < n; i++) {
            cin >> array[i];
        }

        int count = 0;

        for (int i = 0; i < n-1; i++) {
           for(int j = i+1; j < n; j++){
             if(array[i] == array[j])
             count++;
           }
        }

        cout << count << endl;
    }

    return 0;
}

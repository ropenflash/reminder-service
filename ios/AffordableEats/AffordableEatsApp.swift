import SwiftUI

@main
struct AffordableEatsApp: App {
    @StateObject private var restaurantStore = RestaurantStore()

    var body: some Scene {
        WindowGroup {
            RestaurantMapView()
                .environmentObject(restaurantStore)
        }
    }
}

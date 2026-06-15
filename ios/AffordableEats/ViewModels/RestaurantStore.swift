import Foundation
import MapKit
import PhotosUI

@MainActor
final class RestaurantStore: ObservableObject {
    @Published var restaurants: [Restaurant] = Restaurant.sampleData
    @Published var selectedBudget: Decimal = 1_000
    @Published var searchText = ""
    @Published var scannedMenuText = ""

    var filteredRestaurants: [Restaurant] {
        restaurants.filter { restaurant in
            let isWithinBudget = restaurant.averageMealPrice <= selectedBudget
            let matchesSearch = searchText.isEmpty
                || restaurant.name.localizedCaseInsensitiveContains(searchText)
                || restaurant.cuisine.localizedCaseInsensitiveContains(searchText)
                || restaurant.address.localizedCaseInsensitiveContains(searchText)
            return isWithinBudget && matchesSearch
        }
    }

    func addRestaurant(
        name: String,
        address: String,
        cuisine: String,
        averageMealPrice: Decimal,
        latitude: Double,
        longitude: Double,
        menuItems: [MenuItem],
        notes: String
    ) {
        restaurants.append(
            Restaurant(
                name: name,
                address: address,
                cuisine: cuisine,
                averageMealPrice: averageMealPrice,
                coordinate: CLLocationCoordinate2D(latitude: latitude, longitude: longitude),
                menuItems: menuItems,
                notes: notes
            )
        )
    }

    func parseMenuText(_ text: String) -> [MenuItem] {
        text
            .split(separator: "\n")
            .compactMap { line -> MenuItem? in
                let parts = line.split(separator: "-").map { $0.trimmingCharacters(in: .whitespaces) }
                guard parts.count >= 2,
                      let price = Decimal(string: parts.last?.filter { $0.isNumber || $0 == "." } ?? "")
                else { return nil }
                return MenuItem(name: parts[0], price: price, category: "Imported")
            }
    }
}

import CoreLocation
import Foundation

struct MenuItem: Identifiable, Hashable {
    let id = UUID()
    var name: String
    var price: Decimal
    var category: String
}

struct Restaurant: Identifiable, Hashable {
    let id = UUID()
    var name: String
    var address: String
    var cuisine: String
    var averageMealPrice: Decimal
    var coordinate: CLLocationCoordinate2D
    var menuItems: [MenuItem]
    var notes: String

    static let sampleData: [Restaurant] = [
        Restaurant(
            name: "Tandoori Corner",
            address: "12 Market Street",
            cuisine: "Indian",
            averageMealPrice: 950,
            coordinate: CLLocationCoordinate2D(latitude: 37.7858, longitude: -122.4064),
            menuItems: [
                MenuItem(name: "Paneer Wrap", price: 650, category: "Mains"),
                MenuItem(name: "Chicken Thali", price: 1_100, category: "Combos")
            ],
            notes: "Good lunch combos under 1200."
        ),
        Restaurant(
            name: "Sushi Quick",
            address: "88 Mission Avenue",
            cuisine: "Japanese",
            averageMealPrice: 1_850,
            coordinate: CLLocationCoordinate2D(latitude: 37.7891, longitude: -122.4017),
            menuItems: [
                MenuItem(name: "Salmon Roll", price: 1_200, category: "Rolls"),
                MenuItem(name: "Bento Box", price: 2_200, category: "Combos")
            ],
            notes: "Affordable if ordering rolls instead of platters."
        )
    ]
}

extension CLLocationCoordinate2D: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(latitude)
        hasher.combine(longitude)
    }

    public static func == (lhs: CLLocationCoordinate2D, rhs: CLLocationCoordinate2D) -> Bool {
        lhs.latitude == rhs.latitude && lhs.longitude == rhs.longitude
    }
}

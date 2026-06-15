import SwiftUI

struct RestaurantFilterPanel: View {
    @EnvironmentObject private var store: RestaurantStore

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Label("Budget", systemImage: "slider.horizontal.3")
                    .font(.headline)
                Spacer()
                Text("≤ ₹\(Int(truncating: NSDecimalNumber(decimal: store.selectedBudget)))")
                    .font(.headline.monospacedDigit())
            }

            Slider(
                value: Binding(
                    get: { Double(truncating: NSDecimalNumber(decimal: store.selectedBudget)) },
                    set: { store.selectedBudget = Decimal($0.rounded(.toNearestOrAwayFromZero)) }
                ),
                in: 500...5_000,
                step: 100
            )

            Text("Showing \(store.filteredRestaurants.count) nearby restaurants in your price range.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
    }
}

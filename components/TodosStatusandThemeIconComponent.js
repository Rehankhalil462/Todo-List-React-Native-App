import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const TodosStatusandThemeIconComponent = ({
  isEnabled,
  setIsEnabled,
  todos,
}) => {
  const { colors, sizes } = useTheme();
  
  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        {totalCount > 0 ? (
          <View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.listItemText }]}>
                  {totalCount}
                </Text>
                <Text style={[styles.statLabel, { color: colors.fadeText }]}>
                  Total
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.fadeText + "30" }]} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.success || "#4ade80" }]}>
                  {completedCount}
                </Text>
                <Text style={[styles.statLabel, { color: colors.fadeText }]}>
                  Done
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.fadeText + "30" }]} />
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.tertiary }]}>
                  {completionPercentage}%
                </Text>
                <Text style={[styles.statLabel, { color: colors.fadeText }]}>
                  Progress
                </Text>
              </View>
            </View>
            {totalCount > 0 && (
              <View style={[styles.progressBarContainer, { backgroundColor: colors.fadeText + "20" }]}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${completionPercentage}%`,
                      backgroundColor: colors.tertiary,
                    }
                  ]} 
                />
              </View>
            )}
          </View>
        ) : (
          <Text
            style={{
              color: colors.listItemText,
              fontFamily: "RobotoSlab_400Regular",
              fontSize: sizes.todosStatus || 18,
              fontWeight: "500",
              opacity: 0.7,
            }}
          >
            No tasks yet
          </Text>
        )}
      </View>
      <View style={styles.themeContainer}>
        <Text
          style={{
            color: colors.fadeText,
            fontSize: 13,
            fontFamily: "RobotoSlab_400Regular",
            fontWeight: "500",
            marginRight: 8,
          }}
        >
          Light
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
          trackColor={{ 
            false: colors.fadeText + "40", 
            true: colors.secondary + "60" 
          }}
          thumbColor={isEnabled ? colors.tertiary : colors.white}
          ios_backgroundColor={colors.fadeText + "40"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statItem: {
    alignItems: "flex-start",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "RobotoSlab_700Bold",
    lineHeight: 22,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "RobotoSlab_400Regular",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 24,
  },
  progressBarContainer: {
    height: 4,
    borderRadius: 2,
    marginTop: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
    transition: "width 0.3s ease",
  },
  themeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

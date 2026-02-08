import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

interface TeamScoreProps {
  teams: Team[];
  activeTeamId?: string;
}

export function TeamScore({ teams, activeTeamId }: TeamScoreProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...teams.map(t => t.score), 1);

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-semibold">Team Scores</h3>
      </div>

      <div className="space-y-3">
        {sortedTeams.map((team, index) => {
          const isActive = team.id === activeTeamId;
          const isLeading = index === 0 && team.score > 0;
          const barWidth = (team.score / maxScore) * 100;

          return (
            <motion.div
              key={team.id}
              className={`relative rounded-xl p-4 transition-all duration-300 ${
                isActive 
                  ? "bg-primary/10 border border-primary/30 shadow-lg shadow-primary/10" 
                  : "bg-muted/30 border border-transparent"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              {/* Team info */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Rank badge */}
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                    isLeading ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1}
                  </span>
                  
                  {/* Team name */}
                  <span className={`font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                    {team.name}
                  </span>
                </div>

                {/* Score */}
                <motion.span
                  className="font-display text-2xl font-bold text-primary"
                  key={team.score}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {team.score}
                </motion.span>
              </div>

              {/* Score bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                  layoutId="activeTeam"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

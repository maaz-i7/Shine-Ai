"use client";

import ProblemSection from "@/components/ProblemSection.js";
import { useProblemStore } from "../../stores/problem.store.js";

export default function Page() {
    const generatedProblem = useProblemStore(
        (state) => state.generatedProblem
    );

    return (
        <ProblemSection
            content={generatedProblem}
        />
    );
}